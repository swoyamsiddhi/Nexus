import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  reg_number: string;
  branch: string;
  year: number;
  avatar_url: string;
  campus: string;
}

interface Registration {
  id: number;
  registered_at: string;
  event: { id: number; title: string; event_date: string; club: { name: string } };
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState({ events: 0, teams: 0, projects: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetch() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, regRes, teamRes, projectRes] = await Promise.all([
        supabase.from('users').select('*').eq('id', user.id).single(),
        supabase.from('registrations').select('id, registered_at, event:events(id, title, event_date, club:clubs(name))').eq('student_id', user.id).order('registered_at', { ascending: false }).limit(5),
        supabase.from('team_applications').select('*', { count: 'exact', head: true }).eq('student_id', user.id).eq('status', 'accepted'),
        supabase.from('projects').select('*', { count: 'exact', head: true }).eq('posted_by', user.id),
      ]);

      setProfile(profileRes.data as any);
      setRegistrations(regRes.data as any ?? []);
      setStats({
        events: (await supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('student_id', user.id)).count ?? 0,
        teams: teamRes.count ?? 0,
        projects: projectRes.count ?? 0,
      });
      setLoading(false);
    }
    fetch();
  }, []);

  async function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => supabase.auth.signOut() },
    ]);
  }

  if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (!profile) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Identity Card */}
      <View style={styles.identityCard}>
        <Image
          source={profile.avatar_url ? { uri: profile.avatar_url } : require('../../assets/images/icon.png')}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{profile.full_name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <View style={styles.metaBadgeRow}>
            <View style={styles.metaBadge}><Text style={styles.metaBadgeTxt}>{profile.reg_number}</Text></View>
            <View style={styles.metaBadge}><Text style={styles.metaBadgeTxt}>{profile.branch}</Text></View>
            <View style={styles.metaBadge}><Text style={styles.metaBadgeTxt}>Year {profile.year}</Text></View>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatCard value={stats.events} label="Events" />
        <StatCard value={stats.teams} label="Teams" />
        <StatCard value={stats.projects} label="Projects" />
      </View>

      {/* My Registrations */}
      <Text style={styles.sectionLabel}>My Registrations</Text>
      {registrations.length === 0 ? (
        <Text style={styles.emptyTxt}>No event registrations yet.</Text>
      ) : (
        registrations.map(reg => (
          <TouchableOpacity key={reg.id} style={styles.regCard} onPress={() => router.push(`/events/${reg.event.id}`)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.regTitle} numberOfLines={1}>{reg.event.title}</Text>
              <Text style={styles.regMeta}>{reg.event.club?.name}</Text>
              <Text style={styles.regMeta}>{format(new Date(reg.event.event_date), 'MMM d, yyyy')}</Text>
            </View>
            <Text style={styles.regArrow}>→</Text>
          </TouchableOpacity>
        ))
      )}

      {/* Settings / Logout */}
      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionTxt}>⚙️ Settings</Text>
          <Text style={styles.regArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionRow, styles.logoutRow]} onPress={handleLogout}>
          <Text style={[styles.actionTxt, { color: '#dc2626' }]}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
  headerTitle: { fontSize: 32, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1 },
  identityCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginHorizontal: 16, marginBottom: 16, backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1.5, borderColor: '#f4f4f5' },
  avatar: { width: 72, height: 72, borderRadius: 20, backgroundColor: '#f4f4f5' },
  name: { fontSize: 18, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -0.5 },
  email: { fontSize: 12, color: '#71717a', marginTop: 2, fontWeight: '600' },
  metaBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  metaBadge: { backgroundColor: '#f4f4f5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  metaBadgeTxt: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  statsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#18181b', borderRadius: 16, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '900', color: '#fff' },
  statLabel: { fontSize: 10, fontWeight: '800', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },
  sectionLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2, color: '#a1a1aa', marginHorizontal: 16, marginBottom: 12 },
  regCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 10, padding: 16, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f4f4f5' },
  regTitle: { fontSize: 14, fontWeight: '800', letterSpacing: -0.3 },
  regMeta: { fontSize: 12, color: '#71717a', fontWeight: '600', marginTop: 2 },
  regArrow: { fontSize: 18, color: '#a1a1aa', fontWeight: '700' },
  actionsSection: { marginHorizontal: 16, marginTop: 16, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#f4f4f5', overflow: 'hidden' },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f4f4f5' },
  logoutRow: { borderBottomWidth: 0 },
  actionTxt: { fontSize: 14, fontWeight: '700' },
  emptyTxt: { textAlign: 'center', color: '#a1a1aa', padding: 24, fontStyle: 'italic' },
});
