import { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

const FILTERS = [
  { id: 'all', label: 'All Events' },
  { id: 'formal', label: 'Formal' },
  { id: 'announcement', label: 'Announcement' },
];

interface Event {
  id: number;
  title: string;
  event_date: string;
  venue: string;
  banner_url: string;
  event_type: string;
  max_capacity: number;
  club: { id: number; name: string; logo_url: string };
}

function EventCard({ event, onPress }: { event: Event; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: event.banner_url }} style={styles.banner} contentFit="cover" />
      <View style={styles.cardBody}>
        <View style={styles.clubRow}>
          <Image source={{ uri: event.club?.logo_url }} style={styles.clubLogo} contentFit="cover" />
          <Text style={styles.clubName}>{event.club?.name}</Text>
          <View style={[styles.typePill, event.event_type === 'formal' ? styles.formalPill : styles.annPill]}>
            <Text style={styles.typePillText}>{event.event_type?.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{event.title}</Text>
        <Text style={styles.cardDate}>{format(new Date(event.event_date), 'EEE, MMM d • h:mm a')}</Text>
        <Text style={styles.cardVenue} numberOfLines={1}>📍 {event.venue}</Text>
        <TouchableOpacity style={styles.registerBtn} onPress={onPress}>
          <Text style={styles.registerBtnTxt}>View Details →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchEvents = useCallback(async () => {
    let query = supabase
      .from('events')
      .select('id, title, event_date, venue, banner_url, event_type, max_capacity, club:clubs(id, name, logo_url)')
      .order('event_date', { ascending: true });

    if (filter !== 'all') query = query.eq('event_type', filter);

    const { data } = await query;
    setEvents((data as any[]) ?? []);
  }, [filter]);

  useEffect(() => { fetchEvents(); }, [filter]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  }, [fetchEvents]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
      </View>

      {/* Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.id}
            style={[styles.filterPill, filter === f.id && styles.filterPillActive]}
            onPress={() => setFilter(f.id)}
          >
            <Text style={[styles.filterPillText, filter === f.id && styles.filterPillTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlashList
        data={events}
        renderItem={({ item }) => <EventCard event={item} onPress={() => router.push(`/events/${item.id}`)} />}
        estimatedItemSize={340}
        keyExtractor={item => String(item.id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48, marginBottom: 12 }}>📅</Text>
            <Text style={{ fontSize: 20, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase' }}>No Events Yet</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 12 },
  headerTitle: { fontSize: 32, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1 },
  filterContainer: { marginBottom: 8, maxHeight: 56 },
  filterPill: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 100, backgroundColor: '#f4f4f5', borderWidth: 1.5, borderColor: '#e4e4e7' },
  filterPillActive: { backgroundColor: '#18181b', borderColor: '#18181b' },
  filterPillText: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, color: '#71717a' },
  filterPillTextActive: { color: '#ffffff' },
  card: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: '#f4f4f5' },
  banner: { width: '100%', height: 180 },
  cardBody: { padding: 16, gap: 6 },
  clubRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  clubLogo: { width: 26, height: 26, borderRadius: 8, backgroundColor: '#f4f4f5' },
  clubName: { fontSize: 11, fontWeight: '700', color: '#71717a', textTransform: 'uppercase', letterSpacing: 1, flex: 1 },
  typePill: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  formalPill: { backgroundColor: '#dbeafe' },
  annPill: { backgroundColor: '#fef9c3' },
  typePillText: { fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  cardTitle: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5, lineHeight: 24 },
  cardDate: { fontSize: 13, color: '#71717a', fontWeight: '600' },
  cardVenue: { fontSize: 13, color: '#71717a', fontWeight: '600' },
  registerBtn: { marginTop: 8, backgroundColor: '#18181b', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  registerBtnTxt: { color: '#fff', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
});
