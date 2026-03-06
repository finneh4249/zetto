import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EFFORT_LABELS: Record<number, string> = {
  1: 'Too easy',
  2: 'Very easy',
  3: 'Easy',
  4: 'Slightly easy',
  5: 'Just right',
  6: 'Slightly hard',
  7: 'Hard',
  8: 'Very hard',
  9: 'Extremely hard',
  10: 'Overwhelming',
};

export default function AuditScreen() {
  const router = useRouter();
  const [effortRating, setEffortRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (effortRating === null) return;
    // TODO: persist rating to database and adjust difficulty pipeline
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-brand-bg px-6">
        <Text className="text-5xl">✅</Text>
        <Text className="mt-4 text-center text-xl font-bold text-brand-text">
          Calibration saved
        </Text>
        <Text className="mt-2 text-center text-sm text-brand-text-secondary">
          Your upcoming week has been adjusted based on your rating.
        </Text>
        <TouchableOpacity
          className="mt-8 rounded-xl bg-brand-accent px-8 py-4"
          onPress={() => router.replace('/')}
          activeOpacity={0.85}
        >
          <Text className="font-bold text-brand-bg">Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['bottom']}>
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <Text className="text-2xl font-bold text-brand-text">Weekly Audit</Text>
        <Text className="mt-2 text-sm text-brand-text-secondary">
          Rate the overall effort level of your practice this week. Your answer
          calibrates next week's difficulty mix.
        </Text>

        {/* Rating grid */}
        <Text className="mb-4 mt-8 font-semibold text-brand-text">
          Effort rating
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <TouchableOpacity
              key={n}
              className={`h-12 w-12 items-center justify-center rounded-xl border ${
                effortRating === n
                  ? 'border-brand-accent bg-brand-accent'
                  : 'border-brand-border bg-brand-surface'
              }`}
              onPress={() => setEffortRating(n)}
              activeOpacity={0.8}
            >
              <Text
                className={`font-bold ${effortRating === n ? 'text-brand-bg' : 'text-brand-text'}`}
              >
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {effortRating !== null ? (
          <Text className="mt-3 text-sm text-brand-text-secondary">
            {effortRating} — {EFFORT_LABELS[effortRating]}
          </Text>
        ) : null}

        {/* Submit */}
        <TouchableOpacity
          className={`mt-10 items-center rounded-xl px-6 py-5 ${
            effortRating !== null ? 'bg-brand-accent' : 'bg-brand-surface'
          }`}
          onPress={handleSubmit}
          disabled={effortRating === null}
          activeOpacity={0.85}
        >
          <Text
            className={`font-bold ${effortRating !== null ? 'text-brand-bg' : 'text-brand-muted'}`}
          >
            Submit Rating
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
