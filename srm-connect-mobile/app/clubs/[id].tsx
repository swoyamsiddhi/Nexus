import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { FlashList } from '@shopify/flash-list';

interface Club { id: number; name: string; logo_url: string; banner_url: string; description: string; category: string; }
interface Event { id: number; title: string; event_date: string; venue: string; banner_url: string; }
interface Announcement { id: number; content: string; created_at: string; pinned_until: string | null; }

export default function ClubProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState<'events' | 'announcements'>('events');
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      const cId = Number(id);
      const [clubRes, eventsRes, annRes] = await Promise.all([
        supabase.from('clubs').select('*').eq('id', cId).single(),
        supabase.from('events').select('id, title, event_date, venue, banner_url').eq('club_id', cId).order('event_date'),
        supabase.from('announcements').select('*').eq('club_id', cId).order('created_at', { ascending: false }),
      ]);
      setClub(clubRes.data as any);
      setEvents(eventsRes.data as any ?? []);
      setAnnouncements(annRes.data as any ?? []);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { count } = await supabase.from('follows').select('*', { count: 'exact', head: true }).eq('club_id', cId).eq('student_id', user.id);
        setFollowing((count ?? 0) > 0);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  async function toggleFollow() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (following) {
      await supabase.from('follows').delete().eq('club_id', Number(id)).eq('student_id', user.id);
      setFollowing(false);
    } else {
      await supabase.from('follows').insert({ club_id: Number(id), student_id: user.id });
      setFollowing(true);
    }
  }

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (!club) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Banner */}
        <View>
          <Image source={{ uri: club.banner_url }} style={styles.banner} contentFit="cover" />
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnTxt}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Club Info Row */}
        <View style={styles.infoRow}>
          <Image source={{ uri: club.logo_url }} style={styles.logo} contentFit="cover" />
          <View style={{ flex: 1 }}>
            <Text style={styles.clubName}>{club.name}</Text>
            <Text style={styles.category}>{club.category}</Text>
          </View>
          <TouchableOpacity style={[styles.followBtn, following && styles.followingBtn]} onPress={toggleFollow}>
            <Text style={[styles.followBtnTxt, following && styles.followingBtnTxt]}>{following ? 'Following' : 'Follow'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{club.description}</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['events', 'announcements'] as const).map(tab => (
            <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabTxt, activeTab === tab && styles.tabTxtActive]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'events' ? (
          events.length === 0 ? (
            <Text style={styles.emptyTxt}>No events posted yet.</Text>
          ) : (
            events.map(ev => (
              <TouchableOpacity key={ev.id} style={styles.miniCard} onPress={() => router.push(`/events/${ev.id}`)}>
                <Image source={{ uri: ev.banner_url }} style={styles.miniCardImg} contentFit="cover" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.miniCardTitle}>{ev.title}</Text>
                  <Text style={styles.miniCardMeta}>{format(new Date(ev.event_date), 'MMM d, yyyy')}</Text>
                  <Text style={styles.miniCardMeta} numberOfLines={1}>📍 {ev.venue}</Text>
                </View>
              </TouchableOpacity>
            ))
          )
        ) : (
          announcements.length === 0 ? (
            <Text style={styles.emptyTxt}>No announcements yet.</Text>
          ) : (
            announcements.map(ann => (
              <View key={ann.id} style={styles.annCard}>
                {ann.pinned_until && <Text style={styles.pinBadge}>📌 PINNED</Text>}
                <Text style={styles.annContent}>{ann.content}</Text>
                <Text style={styles.annDate}>{format(new Date(ann.created_at), 'MMM d, yyyy')}</Text>
              </View>
            ))
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { width: '100%', height: 220 },
  backBtn: { position: 'absolute', top: 52, left: 16, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100 },
  backBtnTxt: { color: '#fff', fontWeight: '800', fontSize: 13 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  logo: { width: 56, height: 56, borderRadius: 16, borderWidth: 3, borderColor: '#fff', backgroundColor: '#f4f4f5' },
  clubName: { fontSize: 18, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -0.5 },
  category: { fontSize: 11, fontWeight: '700', color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  followBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, borderWidth: 2, borderColor: '#18181b' },
  followingBtn: { backgroundColor: '#18181b' },
  followBtnTxt: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, color: '#18181b' },
  followingBtnTxt: { color: '#fff' },
  description: { paddingHorizontal: 16, fontSize: 14, lineHeight: 22, color: '#52525b', marginBottom: 16 },
  tabs: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 16, backgroundColor: '#f4f4f5', borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: '#fff' },
  tabTxt: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, color: '#71717a' },
  tabTxtActive: { color: '#18181b' },
  miniCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 16, marginBottom: 12, padding: 12, backgroundColor: '#fafafa', borderRadius: 16, borderWidth: 1, borderColor: '#f4f4f5' },
  miniCardImg: { width: 60, height: 60, borderRadius: 12 },
  miniCardTitle: { fontSize: 14, fontWeight: '800', letterSpacing: -0.3, flex: 1 },
  miniCardMeta: { fontSize: 12, color: '#71717a', fontWeight: '600', marginTop: 2 },
  annCard: { marginHorizontal: 16, marginBottom: 12, padding: 16, backgroundColor: '#fffbeb', borderRadius: 16, borderWidth: 1, borderColor: '#fef9c3' },
  pinBadge: { fontSize: 10, fontWeight: '900', color: '#92400e', letterSpacing: 1, marginBottom: 8 },
  annContent: { fontSize: 14, lineHeight: 22, color: '#3f3f46' },
  annDate: { fontSize: 11, color: '#a1a1aa', marginTop: 8, fontWeight: '600' },
  emptyTxt: { textAlign: 'center', color: '#a1a1aa', paddingTop: 32, paddingHorizontal: 40, fontStyle: 'italic' },
});
