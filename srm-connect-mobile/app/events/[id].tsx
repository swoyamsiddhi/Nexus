import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';

interface EventDetail {
  id: number;
  title: string;
  description: string;
  banner_url: string;
  venue: string;
  event_date: string;
  registration_deadline: string;
  max_capacity: number;
  event_type: string;
  club: { id: number; name: string; logo_url: string };
}

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('events')
        .select('*, club:clubs(id, name, logo_url)')
        .eq('id', Number(id))
        .single();
      setEvent(data as any);

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { count } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', Number(id))
          .eq('student_id', user.id);
        setRegistered((count ?? 0) > 0);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  async function handleRegister() {
    setRegistering(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { Alert.alert('Error', 'Not logged in'); return; }

    if (registered) {
      const { error } = await supabase.from('registrations').delete().eq('event_id', Number(id)).eq('student_id', user.id);
      if (!error) setRegistered(false);
    } else {
      const { error } = await supabase.from('registrations').insert({ event_id: Number(id), student_id: user.id });
      if (error) Alert.alert('Error', error.message);
      else setRegistered(true);
    }
    setRegistering(false);
  }

  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  if (!event) return <View style={styles.centered}><Text>Event not found</Text></View>;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Banner */}
        <Image source={{ uri: event.banner_url }} style={styles.banner} contentFit="cover" />

        {/* Back Button Overlay */}
        <SafeAreaView style={styles.backBtn} edges={['top']}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtnInner}>
            <Text style={styles.backBtnTxt}>← Back</Text>
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.content}>
          <View style={styles.clubRow}>
            <Image source={{ uri: event.club?.logo_url }} style={styles.clubLogo} contentFit="cover" />
            <Text style={styles.clubName}>{event.club?.name}</Text>
            <View style={[styles.typePill, event.event_type === 'formal' ? styles.formalPill : styles.annPill]}>
              <Text style={styles.typePillTxt}>{event.event_type?.toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.metaCard}>
            <MetaRow emoji="📅" label="Date" value={format(new Date(event.event_date), 'EEEE, MMMM d yyyy • h:mm a')} />
            <MetaRow emoji="📍" label="Venue" value={event.venue} />
            {event.registration_deadline && (
              <MetaRow emoji="⏰" label="Register By" value={format(new Date(event.registration_deadline), 'MMM d, yyyy')} />
            )}
            {event.max_capacity && (
              <MetaRow emoji="👥" label="Capacity" value={`${event.max_capacity} seats`} />
            )}
          </View>

          <Text style={styles.sectionLabel}>About this Event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
      </ScrollView>

      {/* Sticky Register Button */}
      <View style={styles.stickyFooter}>
        <TouchableOpacity
          style={[styles.registerBtn, registered && styles.unregisterBtn, registering && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={registering}
        >
          {registering ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerBtnTxt}>
              {registered ? '✓ Registered — Tap to Cancel' : 'Register for this Event'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MetaRow({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaEmoji}>{emoji}</Text>
      <View>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  banner: { width: '100%', height: 260 },
  backBtn: { position: 'absolute', top: 0, left: 0 },
  backBtnInner: { margin: 16, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100 },
  backBtnTxt: { color: '#fff', fontWeight: '800', fontSize: 13 },
  content: { padding: 20, gap: 16 },
  clubRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  clubLogo: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#f4f4f5' },
  clubName: { fontSize: 12, fontWeight: '700', color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, flex: 1 },
  typePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  formalPill: { backgroundColor: '#dbeafe' },
  annPill: { backgroundColor: '#fef9c3' },
  typePillTxt: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1, lineHeight: 34 },
  metaCard: { backgroundColor: '#fafafa', borderRadius: 16, padding: 16, gap: 14, borderWidth: 1, borderColor: '#f4f4f5' },
  metaRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  metaEmoji: { fontSize: 20 },
  metaLabel: { fontSize: 10, fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1 },
  metaValue: { fontSize: 14, fontWeight: '700', color: '#18181b', marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2, color: '#a1a1aa' },
  description: { fontSize: 15, lineHeight: 24, color: '#3f3f46' },
  stickyFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', padding: 16, paddingBottom: 32, borderTopWidth: 1, borderTopColor: '#f4f4f5' },
  registerBtn: { backgroundColor: '#18181b', paddingVertical: 18, borderRadius: 100, alignItems: 'center' },
  unregisterBtn: { backgroundColor: '#16a34a' },
  registerBtnTxt: { color: '#fff', fontWeight: '900', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 },
});
