import { Link } from 'expo-router';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../assets/vermilion-box-v2.svg';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-sumi">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO ── */}
        <View className="items-center px-6 pb-10 pt-14">
          {/* Logo with vermilion glow ring */}
          <View
            className="mb-6 h-24 w-24 items-center justify-center rounded-2xl"
            style={{
              shadowColor: '#D94032',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 20,
              elevation: 12,
              borderWidth: 1,
              borderColor: '#D94032',
              backgroundColor: '#1A1A1A',
            }}
          >
            <LogoSvg width="70%" height="70%" />
          </View>

          {/* Japanese kana logotype */}
          <Text
            className="text-5xl font-bold tracking-widest text-brand-vermilion"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            ゼット
          </Text>
          <Text
            className="mt-1 text-2xl font-bold tracking-tight text-brand-warm"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            Zetto
          </Text>

          {/* Tagline */}
          <Text
            className="mt-4 text-center text-base leading-7 text-brand-stone"
            style={{ fontFamily: 'NotoSansJP_400Regular' }}
          >
            The voice-first Japanese acquisition engine.{'\n'}Speak more. Type less. Level up faster.
          </Text>

          {/* Primary CTA */}
          <Link href="/login" asChild>
            <TouchableOpacity
              className="mt-10 w-full items-center rounded-xl bg-brand-vermilion px-6 py-5 shadow-lg"
              activeOpacity={0.85}
            >
              <Text
                className="text-xl font-bold tracking-wide text-white"
                style={{ fontFamily: 'NotoSansJP_700Bold' }}
              >
                Log In →
              </Text>
            </TouchableOpacity>
          </Link>

          {/* Secondary CTA — ghost */}
          <TouchableOpacity
            className="mt-3 w-full items-center rounded-xl border border-brand-stone/40 px-6 py-4"
            activeOpacity={0.8}
            style={{ borderColor: '#6B656066' }}
          >
            <Text
              className="text-base font-semibold text-brand-stone"
              style={{ fontFamily: 'NotoSansJP_500Medium' }}
            >
              Create an account
            </Text>
          </TouchableOpacity>
        </View>

        {/* ── DIVIDER ── */}
        <View className="mx-6 h-px bg-brand-ink" />

        {/* ── FEATURES GRID ── */}
        <View className="px-6 py-10">
          <Text
            className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-brand-vermilion"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            Why Zetto
          </Text>
          <Text
            className="mb-6 text-center text-2xl font-bold text-brand-warm"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            Built differently.
          </Text>

          <View className="gap-4">
            <View className="flex-row gap-4">
              <FeatureCard icon="🎙" title="Voice-First" description="No keyboard. Speak naturally and be understood in real time." />
              <FeatureCard icon="⚡" title="Acoustic Telemetry" description="Response latency powers dynamic difficulty scaling." />
            </View>
            <View className="flex-row gap-4">
              <FeatureCard icon="🔁" title="Spaced Production" description="Tokens climb through Cloze → Semantic → Roleplay tiers." />
              <FeatureCard icon="🎯" title="Socratic Errors" description="Spot deliberate AI mistakes to sharpen comprehension." />
            </View>
            <View className="flex-row gap-4">
              <FeatureCard icon="🧠" title="Adaptive AI Coach" description="Your coach learns your weak spots and drills them hard." />
              <FeatureCard icon="📈" title="Progress Tracking" description="Rich analytics across vocab, fluency and retention." />
            </View>
          </View>
        </View>

        {/* ── DIVIDER ── */}
        <View className="mx-6 h-px bg-brand-ink" />

        {/* ── HOW IT WORKS ── */}
        <View className="px-6 py-10">
          <Text
            className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-brand-vermilion"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            The Method
          </Text>
          <Text
            className="mb-8 text-center text-2xl font-bold text-brand-warm"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            How it works
          </Text>

          <View className="gap-0">
            <Step number="01" title="Prime with a topic" description="Your AI coach primes you with a scenario—ordering food, navigating Tokyo, or pitching a business idea." />
            <StepConnector />
            <Step number="02" title="Speak, don't type" description="Hold the mic button, respond in Japanese. Latency is measured to the millisecond." />
            <StepConnector />
            <Step number="03" title="Instant feedback loop" description="Errors are caught, pronunciation is scored, and the difficulty adapts in real time." />
            <StepConnector />
            <Step number="04" title="Weekly audit" description="Every seven days, your coach reviews weak points and recalibrates your token progression tiers." />
          </View>
        </View>

        {/* ── DIVIDER ── */}
        <View className="mx-6 h-px bg-brand-ink" />

        {/* ── FINAL CTA ── */}
        <View className="items-center px-6 py-12">
          <Text
            className="mb-2 text-center text-3xl font-bold text-brand-warm"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            Ready to speak?
          </Text>
          <Text
            className="mb-8 text-center text-base text-brand-stone"
            style={{ fontFamily: 'NotoSansJP_400Regular' }}
          >
            Your first session takes less than a minute to start.
          </Text>

          <Link href="/login" asChild>
            <TouchableOpacity
              className="w-full items-center rounded-xl bg-brand-vermilion px-6 py-5"
              activeOpacity={0.85}
            >
              <Text
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'NotoSansJP_700Bold' }}
              >
                始めましょう — Let's begin
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* ── FOOTER ── */}
        <View className="items-center border-t border-brand-ink px-6 py-6">
          <View className="rounded-full border border-brand-ink px-4 py-1.5">
            <Text
              className="text-sm text-brand-stone"
              style={{ fontFamily: 'NotoSansJP_400Regular' }}
            >
              ゼット · Zetto · v1.1.0
            </Text>
          </View>
          <Text
            className="mt-2 text-xs text-brand-stone"
            style={{ fontFamily: 'NotoSansJP_400Regular' }}
          >
            Voice-first Japanese · Built with ❤️
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ──────────────────────────── Sub-components ──────────────────────────── */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View
      className="flex-1 rounded-xl border border-brand-ink bg-brand-tatami p-4"
      style={{ borderTopWidth: 2, borderTopColor: '#D94032' }}
    >
      <View className="mb-3 h-10 w-10 items-center justify-center rounded-lg bg-brand-sumi">
        <Text className="text-xl">{icon}</Text>
      </View>
      <Text
        className="mb-1 font-bold text-brand-warm"
        style={{ fontFamily: 'NotoSansJP_700Bold' }}
      >
        {title}
      </Text>
      <Text
        className="text-xs leading-relaxed text-brand-stone"
        style={{ fontFamily: 'NotoSansJP_400Regular' }}
      >
        {description}
      </Text>
    </View>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row gap-4 rounded-xl border border-brand-ink bg-brand-tatami p-5">
      <View className="h-10 w-10 items-center justify-center rounded-lg bg-brand-vermilion">
        <Text
          className="text-xs font-bold text-white"
          style={{ fontFamily: 'IBMPlexMono_400Regular' }}
        >
          {number}
        </Text>
      </View>
      <View className="flex-1">
        <Text
          className="font-bold text-brand-warm"
          style={{ fontFamily: 'NotoSansJP_700Bold' }}
        >
          {title}
        </Text>
        <Text
          className="mt-1 text-sm leading-relaxed text-brand-stone"
          style={{ fontFamily: 'NotoSansJP_400Regular' }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

function StepConnector() {
  return (
    <View className="ml-[38px] py-0.5">
      <View className="w-0.5 flex-1 self-stretch bg-brand-vermilion" style={{ height: 16, opacity: 0.4 }} />
    </View>
  );
}
