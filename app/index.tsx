import { Link } from 'expo-router';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO ── */}
        <View className="items-center px-6 pb-10 pt-14">
          {/* Decorative accent ring */}
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full border-2 border-brand-accent bg-brand-surface">
            <Text className="text-4xl">🎙</Text>
          </View>

          {/* Japanese kana logotype */}
          <Text className="text-5xl font-bold tracking-widest text-brand-accent">
            ゼット
          </Text>
          <Text className="mt-1 text-2xl font-bold tracking-tight text-brand-text">
            Zetto
          </Text>

          {/* Tagline */}
          <Text className="mt-4 text-center text-base leading-relaxed text-brand-text-secondary">
            The voice-first Japanese acquisition engine.{'\n'}Speak more. Type
            less. Level up faster.
          </Text>

          {/* Stats row */}
          <View className="mt-8 w-full flex-row gap-3">
            <StatPill emoji="🔥" value="0" label="day streak" />
            <StatPill emoji="📚" value="0" label="vocab tokens" />
            <StatPill emoji="🎯" value="0" label="sessions" />
          </View>

          {/* Primary CTA */}
          <Link href="/session" asChild>
            <TouchableOpacity
              className="mt-6 w-full items-center rounded-2xl bg-brand-accent px-6 py-5 shadow-lg"
              activeOpacity={0.85}
            >
              <Text className="text-xl font-bold tracking-wide text-brand-bg">
                Start Session →
              </Text>
              <Text className="mt-1 text-sm font-medium text-brand-bg opacity-70">
                Tap and speak Japanese immediately
              </Text>
            </TouchableOpacity>
          </Link>

          {/* Secondary CTA */}
          <Link href="/audit" asChild>
            <TouchableOpacity
              className="mt-3 w-full items-center rounded-2xl border border-brand-border bg-brand-surface px-6 py-4"
              activeOpacity={0.85}
            >
              <Text className="text-base font-semibold text-brand-text">
                Weekly Audit
              </Text>
              <Text className="mt-0.5 text-sm text-brand-text-secondary">
                Calibrate difficulty with your AI coach
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* ── DIVIDER ── */}
        <View className="mx-6 h-px bg-brand-border" />

        {/* ── FEATURES GRID ── */}
        <View className="px-6 py-10">
          <Text className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-brand-accent">
            Why Zetto
          </Text>
          <Text className="mb-6 text-center text-2xl font-bold text-brand-text">
            Built differently.
          </Text>

          <View className="gap-4">
            <View className="flex-row gap-4">
              <FeatureCard
                icon="🎙"
                title="Voice-First"
                description="No keyboard. Speak naturally and be understood in real time."
              />
              <FeatureCard
                icon="⚡"
                title="Acoustic Telemetry"
                description="Response latency powers dynamic difficulty scaling."
              />
            </View>
            <View className="flex-row gap-4">
              <FeatureCard
                icon="🔁"
                title="Spaced Production"
                description="Tokens climb through Cloze → Semantic → Roleplay tiers."
              />
              <FeatureCard
                icon="🎯"
                title="Socratic Errors"
                description="Spot deliberate AI mistakes to sharpen comprehension."
              />
            </View>
            <View className="flex-row gap-4">
              <FeatureCard
                icon="🧠"
                title="Adaptive AI Coach"
                description="Your coach learns your weak spots and drills them hard."
              />
              <FeatureCard
                icon="📈"
                title="Progress Tracking"
                description="Rich analytics across vocab, fluency and retention."
              />
            </View>
          </View>
        </View>

        {/* ── DIVIDER ── */}
        <View className="mx-6 h-px bg-brand-border" />

        {/* ── HOW IT WORKS ── */}
        <View className="px-6 py-10">
          <Text className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-brand-accent">
            The Method
          </Text>
          <Text className="mb-8 text-center text-2xl font-bold text-brand-text">
            How it works
          </Text>

          <View className="gap-0">
            <Step
              number="01"
              title="Prime with a topic"
              description="Your AI coach primes you with a scenario—ordering food, navigating Tokyo, or pitching a business idea."
            />
            <StepConnector />
            <Step
              number="02"
              title="Speak, don't type"
              description="Hold the mic button, respond in Japanese. Latency is measured to the millisecond."
            />
            <StepConnector />
            <Step
              number="03"
              title="Instant feedback loop"
              description="Errors are caught, pronunciation is scored, and the difficulty adapts in real time."
            />
            <StepConnector />
            <Step
              number="04"
              title="Weekly audit"
              description="Every seven days, your coach reviews weak points and recalibrates your token progression tiers."
            />
          </View>
        </View>

        {/* ── DIVIDER ── */}
        <View className="mx-6 h-px bg-brand-border" />

        {/* ── FINAL CTA ── */}
        <View className="items-center px-6 py-12">
          <Text className="mb-2 text-center text-3xl font-bold text-brand-text">
            Ready to speak?
          </Text>
          <Text className="mb-8 text-center text-base text-brand-text-secondary">
            Your first session takes less than a minute to start.
          </Text>

          <Link href="/session" asChild>
            <TouchableOpacity
              className="w-full items-center rounded-2xl bg-brand-accent px-6 py-5"
              activeOpacity={0.85}
            >
              <Text className="text-xl font-bold text-brand-bg">
                始めましょう — Let's begin
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* ── FOOTER ── */}
        <View className="items-center border-t border-brand-border px-6 py-6">
          <Text className="text-sm text-brand-text-secondary">
            ゼット · Zetto · v1.0
          </Text>
          <Text className="mt-1 text-xs text-brand-muted">
            Voice-first Japanese · Built with ❤️
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ──────────────────────────── Sub-components ──────────────────────────── */

function StatPill({
  emoji,
  value,
  label,
}: {
  emoji: string;
  value: string;
  label: string;
}) {
  return (
    <View className="flex-1 items-center rounded-2xl border border-brand-border bg-brand-surface py-4">
      <Text className="text-xl">{emoji}</Text>
      <Text className="mt-1 text-lg font-bold text-brand-text">{value}</Text>
      <Text className="text-xs text-brand-text-secondary">{label}</Text>
    </View>
  );
}

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
    <View className="flex-1 rounded-2xl border border-brand-border bg-brand-surface p-4">
      <Text className="mb-2 text-3xl">{icon}</Text>
      <Text className="mb-1 font-bold text-brand-text">{title}</Text>
      <Text className="text-xs leading-relaxed text-brand-text-secondary">
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
    <View className="flex-row gap-4 rounded-2xl border border-brand-border bg-brand-surface p-5">
      <View className="h-10 w-10 items-center justify-center rounded-full bg-brand-accent">
        <Text className="text-xs font-bold text-brand-bg">{number}</Text>
      </View>
      <View className="flex-1">
        <Text className="font-bold text-brand-text">{title}</Text>
        <Text className="mt-1 text-sm leading-relaxed text-brand-text-secondary">
          {description}
        </Text>
      </View>
    </View>
  );
}

function StepConnector() {
  return (
    <View className="ml-11 w-px self-stretch py-1">
      <View className="flex-1 w-px bg-brand-border" />
    </View>
  );
}
