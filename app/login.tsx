import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoSvg from '../assets/vermilion-box-v2.svg';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = async () => {
    await AsyncStorage.setItem('zetto_auth_token', 'mock_token_123');
    router.replace('/dashboard');
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-sumi">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center px-6 py-12">
          {/* Logo */}
          <View className="mb-5 h-16 w-16">
            <LogoSvg width="100%" height="100%" />
          </View>
          <Text
            className="mb-2 text-3xl font-bold tracking-widest text-brand-warm"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            ZETTO
          </Text>
          <Text
            className="mb-10 text-sm text-brand-stone"
            style={{ fontFamily: 'NotoSansJP_400Regular' }}
          >
            Voice-first Japanese acquisition
          </Text>

          {/* ── Glass card form ── */}
          <View className="w-full rounded-2xl border border-brand-ink bg-brand-tatami px-6 py-8">
            {/* Email */}
            <View className="mb-5">
              <Text
                className="mb-2 text-sm font-semibold text-brand-stone"
                style={{ fontFamily: 'NotoSansJP_500Medium' }}
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                placeholder="you@example.com"
                placeholderTextColor="#6B6560"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full rounded-xl bg-brand-sumi px-4 py-4 text-brand-warm"
                style={{
                  fontFamily: 'IBMPlexMono_400Regular',
                  borderWidth: 1,
                  borderColor: emailFocused ? '#D94032' : '#1A1A1A',
                }}
              />
            </View>

            {/* Password */}
            <View className="mb-2">
              <Text
                className="mb-2 text-sm font-semibold text-brand-stone"
                style={{ fontFamily: 'NotoSansJP_500Medium' }}
              >
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="••••••••"
                placeholderTextColor="#6B6560"
                secureTextEntry
                className="w-full rounded-xl bg-brand-sumi px-4 py-4 text-brand-warm"
                style={{
                  borderWidth: 1,
                  borderColor: passwordFocused ? '#D94032' : '#1A1A1A',
                }}
              />
            </View>

            {/* Forgot password stub */}
            <TouchableOpacity className="mb-6 self-end" activeOpacity={0.7}>
              <Text
                className="text-xs text-brand-stone underline"
                style={{ fontFamily: 'NotoSansJP_400Regular' }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Sign In */}
            <TouchableOpacity
              className="w-full items-center rounded-xl bg-brand-vermilion px-6 py-5"
              onPress={handleLogin}
              activeOpacity={0.85}
            >
              <Text
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'NotoSansJP_700Bold' }}
              >
                Sign In →
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
