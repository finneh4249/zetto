import { Link, useRouter } from 'expo-router';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('zetto_auth_token');
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-sumi">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 py-10">

          {/* ── Header ── */}
          <View className="flex-row items-start justify-between mb-2">
            <View>
              <Text
                className="text-sm text-brand-stone"
                style={{ fontFamily: 'NotoSansJP_400Regular' }}
              >
                {getGreeting()} 👋
              </Text>
              <Text
                className="text-3xl font-bold text-brand-warm"
                style={{ fontFamily: 'NotoSansJP_700Bold' }}
              >
                ゼット Dashboard
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={0.8}
              className="mt-1 rounded-full border border-brand-ink px-3 py-1.5"
            >
              <Text
                className="text-xs text-brand-stone"
                style={{ fontFamily: 'NotoSansJP_400Regular' }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="my-6 h-px bg-brand-ink" />

          {/* ── Stats ── */}
          <Text
            className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-vermilion"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            Your Stats
          </Text>
          <View className="w-full flex-row gap-3 mb-10">
            <StatCard emoji="🔥" value="12" label="day streak" accentColor="#D4A03C" />
            <StatCard emoji="📚" value="184" label="vocab tokens" accentColor="#5B8C5A" />
            <StatCard emoji="🎯" value="34" label="sessions" accentColor="#D94032" />
          </View>

          {/* ── Primary CTA: Start Session ── */}
          <Text
            className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-vermilion"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            Practice
          </Text>
          <Link href="/session" asChild>
            <TouchableOpacity
              className="w-full rounded-xl bg-brand-vermilion px-6 py-6 shadow-lg mb-4"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text
                    className="text-xl font-bold tracking-wide text-white"
                    style={{ fontFamily: 'NotoSansJP_700Bold' }}
                  >
                    Start Session →
                  </Text>
                  <Text
                    className="mt-1 text-sm text-white opacity-70"
                    style={{ fontFamily: 'NotoSansJP_500Medium' }}
                  >
                    Tap and speak Japanese immediately
                  </Text>
                </View>
                <View className="ml-4 rounded-full bg-white/20 px-2 py-1">
                  <Text
                    className="text-xs font-bold text-white"
                    style={{ fontFamily: 'IBMPlexMono_400Regular' }}
                  >
                    🔴 LIVE
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>

          {/* ── Secondary CTA: Weekly Audit ── */}
          <Link href="/audit" asChild>
            <TouchableOpacity
              className="w-full rounded-xl border border-brand-ink bg-brand-tatami px-6 py-5"
              activeOpacity={0.85}
            >
              <View className="flex-row items-center">
                <Text className="mr-3 text-xl">📅</Text>
                <View>
                  <Text
                    className="text-base font-semibold text-brand-warm"
                    style={{ fontFamily: 'NotoSansJP_500Medium' }}
                  >
                    Weekly Audit
                  </Text>
                  <Text
                    className="mt-0.5 text-sm text-brand-stone"
                    style={{ fontFamily: 'NotoSansJP_400Regular' }}
                  >
                    Calibrate difficulty with your AI coach
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ──────────────────────────── Sub-components ──────────────────────────── */

function StatCard({
  emoji,
  value,
  label,
  accentColor,
}: {
  emoji: string;
  value: string;
  label: string;
  accentColor: string;
}) {
  return (
    <View
      className="flex-1 rounded-xl border border-brand-ink bg-brand-tatami py-5 px-3 items-center"
      style={{ borderTopWidth: 3, borderTopColor: accentColor }}
    >
      <Text className="text-xl mb-1">{emoji}</Text>
      <Text
        className="text-2xl font-bold text-brand-warm"
        style={{ fontFamily: 'IBMPlexMono_400Regular' }}
      >
        {value}
      </Text>
      <Text
        className="mt-0.5 text-xs text-center text-brand-stone"
        style={{ fontFamily: 'NotoSansJP_400Regular' }}
      >
        {label}
      </Text>
    </View>
  );
}
