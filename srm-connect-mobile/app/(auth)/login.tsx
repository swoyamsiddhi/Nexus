import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signIn() {
    if (!email.endsWith('@srmist.edu.in')) {
      Alert.alert('Invalid Email', 'Only @srmist.edu.in email addresses are allowed.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) Alert.alert('Login Failed', error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 12, fontWeight: '900', letterSpacing: 4, textTransform: 'uppercase', color: '#71717a', marginBottom: 8 }}>
            SRM CONNECT
          </Text>
          <Text style={{ fontSize: 36, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1 }}>
            Welcome Back
          </Text>
          <Text style={{ color: '#71717a', marginTop: 8 }}>Sign in with your SRM email.</Text>
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, color: '#52525b' }}>
              Email
            </Text>
            <TextInput
              style={{
                borderWidth: 2, borderColor: '#e4e4e7', borderRadius: 16,
                padding: 16, fontSize: 15, backgroundColor: '#fafafa',
              }}
              onChangeText={setEmail}
              value={email}
              placeholder="you@srmist.edu.in"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View>
            <Text style={{ fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, color: '#52525b' }}>
              Password
            </Text>
            <TextInput
              style={{
                borderWidth: 2, borderColor: '#e4e4e7', borderRadius: 16,
                padding: 16, fontSize: 15, backgroundColor: '#fafafa',
              }}
              onChangeText={setPassword}
              value={password}
              secureTextEntry
              placeholder="••••••••"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: '#18181b', padding: 18, borderRadius: 100,
              alignItems: 'center', marginTop: 8, opacity: loading ? 0.7 : 1,
            }}
            onPress={signIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/signup')} style={{ alignItems: 'center', marginTop: 8 }}>
            <Text style={{ color: '#71717a', fontSize: 14 }}>
              Don't have an account?{' '}
              <Text style={{ fontWeight: '800', color: '#18181b' }}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
