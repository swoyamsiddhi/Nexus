import { View, Text, StyleSheet } from 'react-native';

export default function TeamsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>SRM CONNECT</Text>
      <Text style={styles.title}>Teams</Text>
      <Text style={styles.subtitle}>Find hackathon teammates. Coming next.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', padding: 24 },
  label: { fontSize: 10, fontWeight: '900', letterSpacing: 4, color: '#a1a1aa', marginBottom: 8 },
  title: { fontSize: 40, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1 },
  subtitle: { color: '#71717a', marginTop: 8, textAlign: 'center' },
});
