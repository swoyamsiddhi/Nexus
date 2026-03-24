import { useEffect, useState, useCallback } from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

interface FeedItem {
  id: number;
  type: 'event' | 'announcement';
  title?: string;
  content?: string;
  banner_url?: string;
  event_date?: string;
  venue?: string;
  created_at: string;
  club: { id: number; name: string; logo_url: string };
}

function EventCard({ item, onPress }: { item: FeedItem; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {item.banner_url && (
        <Image source={{ uri: item.banner_url }} style={styles.banner} contentFit="cover" />
      )}
      <View style={styles.cardBody}>
        <View style={styles.clubRow}>
          <Image source={{ uri: item.club?.logo_url }} style={styles.clubLogo} contentFit="cover" />
          <Text style={styles.clubName}>{item.club?.name}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        {item.event_date && (
          <Text style={styles.cardMeta}>{format(new Date(item.event_date), 'EEE, MMM d • h:mm a')}</Text>
        )}
        {item.venue && <Text style={styles.cardMeta}>📍 {item.venue}</Text>}
      </View>
    </TouchableOpacity>
  );
}

function AnnouncementCard({ item }: { item: FeedItem }) {
  return (
    <View style={[styles.card, styles.announcementCard]}>
      <View style={styles.clubRow}>
        <Image source={{ uri: item.club?.logo_url }} style={styles.clubLogo} contentFit="cover" />
        <View>
          <Text style={styles.clubName}>{item.club?.name}</Text>
          <Text style={styles.announcementBadge}>📢 ANNOUNCEMENT</Text>
        </View>
      </View>
      <Text style={styles.announcementContent}>{item.content}</Text>
    </View>
  );
}

const PAGE_SIZE = 10;

export default function FeedScreen() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasFollows, setHasFollows] = useState(true);
  const router = useRouter();

  const fetchFeed = useCallback(async (pageNum: number, isRefresh = false) => {
    if (loading && !isRefresh) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    // Check follows
    const { count } = await supabase.from('follows').select('*', { count: 'exact', head: true }).eq('student_id', user.id);
    setHasFollows((count ?? 0) > 0);

    // Fetch events from followed clubs
    const { data: follows } = await supabase.from('follows').select('club_id').eq('student_id', user.id);
    const clubIds = follows?.map(f => f.club_id) ?? [];

    if (clubIds.length === 0) { setLoading(false); return; }

    const { data: events } = await supabase
      .from('events')
      .select('id, title, banner_url, event_date, venue, created_at, club:clubs(id, name, logo_url)')
      .in('club_id', clubIds)
      .order('created_at', { ascending: false })
      .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1);

    if (!events) { setLoading(false); return; }

    const mapped: FeedItem[] = events.map((e: any) => ({ ...e, type: 'event', club: e.club }));
    setHasMore(mapped.length === PAGE_SIZE);
    setItems(prev => isRefresh ? mapped : [...prev, ...mapped]);
    setLoading(false);
  }, [loading]);

  useEffect(() => { fetchFeed(0); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0);
    setHasMore(true);
    await fetchFeed(0, true);
    setRefreshing(false);
  }, [fetchFeed]);

  const onEndReached = useCallback(() => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeed(nextPage);
  }, [hasMore, loading, page, fetchFeed]);

  if (!hasFollows) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyEmoji}>🏛️</Text>
        <Text style={styles.emptyTitle}>No Followed Clubs</Text>
        <Text style={styles.emptySubtitle}>Follow clubs to see their events and announcements here.</Text>
        <TouchableOpacity style={styles.emptyBtn} onPress={() => router.push('/clubs')}>
          <Text style={styles.emptyBtnTxt}>Discover Clubs</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <FlashList
        data={items}
        renderItem={({ item }) =>
          item.type === 'event'
            ? <EventCard item={item} onPress={() => router.push(`/events/${item.id}`)} />
            : <AnnouncementCard item={item} />
        }
        estimatedItemSize={280}
        keyExtractor={item => `${item.type}-${item.id}`}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Feed</Text>
            <Text style={styles.headerSub}>SRM Connect • Campus</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1 },
  headerSub: { color: '#71717a', fontWeight: '600', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: '#f4f4f5' },
  announcementCard: { padding: 20 },
  banner: { width: '100%', height: 180 },
  cardBody: { padding: 16, gap: 6 },
  clubRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 },
  clubLogo: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#f4f4f5' },
  clubName: { fontSize: 12, fontWeight: '700', color: '#71717a', textTransform: 'uppercase', letterSpacing: 1 },
  cardTitle: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
  cardMeta: { fontSize: 13, color: '#71717a', fontWeight: '600' },
  announcementBadge: { fontSize: 10, fontWeight: '800', color: '#a16207', letterSpacing: 1 },
  announcementContent: { fontSize: 14, lineHeight: 22, color: '#3f3f46', marginTop: 12 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 24, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase' },
  emptySubtitle: { color: '#71717a', textAlign: 'center', marginTop: 8, lineHeight: 22 },
  emptyBtn: { marginTop: 24, backgroundColor: '#18181b', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 100 },
  emptyBtnTxt: { color: '#fff', fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2, fontSize: 13 },
});
