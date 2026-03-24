import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signUp() {
    if (!email.endsWith('@srmist.edu.in')) {
      Alert.alert('Invalid Email', 'Only @srmist.edu.in email addresses are allowed.');
      return;
    }
    if (!fullName.trim()) {
      Alert.alert('Invalid Name', 'Please enter your full name.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, reg_number: regNumber },
      },
    });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Check your email', 'A verification link has been sent to your SRM email.');
      router.back();
    }
    setLoading(false);
  }

  const inputStyle = {
    borderWidth: 2, borderColor: '#e4e4e7', borderRadius: 16,
    padding: 16, fontSize: 15, backgroundColor: '#fafafa',
  };
  const labelStyle = {
    fontSize: 11, fontWeight: '800' as const, textTransform: 'uppercase' as const,
    letterSpacing: 2, marginBottom: 8, color: '#52525b',
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingTop: 60 }} keyboardShouldPersistTaps="handled">
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 12, fontWeight: '900', letterSpacing: 4, textTransform: 'uppercase', color: '#71717a', marginBottom: 8 }}>
            SRM CONNECT
          </Text>
          <Text style={{ fontSize: 36, fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: -1 }}>
            Create Account
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <View><Text style={labelStyle}>Full Name</Text>
            <TextInput style={inputStyle} onChangeText={setFullName} value={fullName} placeholder="Your full name" autoCapitalize="words" />
          </View>
          <View><Text style={labelStyle}>SRM Email</Text>
            <TextInput style={inputStyle} onChangeText={setEmail} value={email} placeholder="you@srmist.edu.in" autoCapitalize="none" keyboardType="email-address" />
          </View>
          <View><Text style={labelStyle}>Registration Number</Text>
            <TextInput style={inputStyle} onChangeText={setRegNumber} value={regNumber} placeholder="RA2211004..." autoCapitalize="characters" />
          </View>
          <View><Text style={labelStyle}>Password</Text>
            <TextInput style={inputStyle} onChangeText={setPassword} value={password} secureTextEntry placeholder="••••••••" autoCapitalize="none" />
          </View>

          <TouchableOpacity
            style={{ backgroundColor: '#18181b', padding: 18, borderRadius: 100, alignItems: 'center', marginTop: 8, opacity: loading ? 0.7 : 1 }}
            onPress={signUp} disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : (
              <Text style={{ color: '#fff', fontWeight: '900', fontSize: 13, textTransform: 'uppercase', letterSpacing: 2 }}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center', marginTop: 8 }}>
            <Text style={{ color: '#71717a', fontSize: 14 }}>
              Already have an account? <Text style={{ fontWeight: '800', color: '#18181b' }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
