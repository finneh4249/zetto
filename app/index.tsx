import { Link } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-bg">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="mb-10">
            <Text className="text-4xl font-bold tracking-tight text-brand-text">
              zettoゼット
            </Text>
            <Text className="mt-2 text-base text-brand-text-secondary">
              Voice-first Japanese acquisition engine
            </Text>
          </View>

          {/* Daily streak / stats row */}
          <View className="mb-8 flex-row gap-3">
            <StatCard label="Streak" value="0 days" />
            <StatCard label="Vocab" value="0 tokens" />
            <StatCard label="Sessions" value="0" />
          </View>

          {/* Start session CTA */}
          <Link href="/session" asChild>
            <TouchableOpacity
              className="mb-4 items-center rounded-xl bg-brand-accent px-6 py-5"
              activeOpacity={0.85}
            >
              <Text className="text-lg font-bold text-brand-bg">
                Start Session
              </Text>
              <Text className="mt-1 text-sm text-brand-bg opacity-70">
                Tap to begin voice practice
              </Text>
            </TouchableOpacity>
          </Link>

          {/* Weekly audit card */}
          <Link href="/audit" asChild>
            <TouchableOpacity
              className="items-center rounded-xl border border-brand-border bg-brand-surface px-6 py-4"
              activeOpacity={0.85}
            >
              <Text className="text-base font-semibold text-brand-text">
                Weekly Audit
              </Text>
              <Text className="mt-1 text-sm text-brand-text-secondary">
                Calibrate difficulty with your coach
              </Text>
            </TouchableOpacity>
          </Link>

          {/* How it works section */}
          <View className="mt-10">
            <Text className="mb-4 text-lg font-semibold text-brand-text">
              How it works
            </Text>
            <View className="gap-3">
              <FeatureRow
                icon="🎙"
                title="Voice-First"
                description="No typing. Speak Japanese and be understood instantly."
              />
              <FeatureRow
                icon="⚡"
                title="Acoustic Telemetry"
                description="Your response latency drives dynamic difficulty scaling."
              />
              <FeatureRow
                icon="🔁"
                title="Spaced Production"
                description="Tokens progress through Cloze → Semantic → Roleplay tiers."
              />
              <FeatureRow
                icon="🎯"
                title="Socratic Errors"
                description="Catch deliberate AI mistakes to sharpen comprehension."
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center rounded-xl border border-brand-border bg-brand-surface py-3">
      <Text className="text-xl font-bold text-brand-text">{value}</Text>
      <Text className="mt-0.5 text-xs text-brand-text-secondary">{label}</Text>
    </View>
  );
}

function FeatureRow({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-start gap-3 rounded-xl border border-brand-border bg-brand-surface px-4 py-3">
      <Text className="text-2xl">{icon}</Text>
      <View className="flex-1">
        <Text className="font-semibold text-brand-text">{title}</Text>
        <Text className="mt-0.5 text-sm text-brand-text-secondary">
          {description}
        </Text>
      </View>
    </View>
  );
}
