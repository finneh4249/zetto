import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TranscriptView } from '../src/components/TranscriptView';
import { VoiceButton } from '../src/components/VoiceButton';
import { useSession } from '../src/hooks/useSession';

function latencyColour(ms: number): string {
  if (ms < 2000) return '#5B8C5A'; // matcha — fast
  if (ms < 4000) return '#D4A03C'; // amber — acceptable
  return '#D94032';                 // vermilion — slow
}

export default function SessionScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const { state, topic, transcript, latencyMs, startListening, stopListening } =
    useSession();

  useEffect(() => {
    if (transcript.length > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [transcript.length]);

  return (
    <SafeAreaView className="flex-1 bg-brand-sumi" edges={['bottom']}>
      {/* ── Topic priming banner — full-bleed vermilion strip ── */}
      {topic ? (
        <View className="bg-brand-vermilion px-6 py-4">
          <Text
            className="text-xs font-bold uppercase tracking-widest text-white opacity-70"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            [ TOPIC ]
          </Text>
          <Text
            className="mt-0.5 text-lg font-bold text-white"
            style={{ fontFamily: 'NotoSansJP_700Bold' }}
          >
            {topic}
          </Text>
        </View>
      ) : null}

      {/* ── Transcript ── */}
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {transcript.length === 0 ? (
          <View className="mt-24 items-center">
            <Text className="text-8xl">🎙</Text>
            <Text
              className="mt-6 text-center text-xl font-bold text-brand-warm"
              style={{ fontFamily: 'NotoSansJP_700Bold' }}
            >
              Your AI coach is ready.
            </Text>
            <Text
              className="mt-2 text-center text-sm text-brand-stone"
              style={{ fontFamily: 'NotoSansJP_400Regular' }}
            >
              Tap the microphone below to start speaking Japanese.
            </Text>
          </View>
        ) : (
          transcript.map((entry) => (
            <TranscriptView key={entry.id} entry={entry} />
          ))
        )}
      </ScrollView>

      {/* ── Bottom controls — floating bottom-sheet style ── */}
      <View
        className="border-t border-brand-ink bg-brand-tatami px-6 py-5"
        style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        {latencyMs !== null ? (
          <View className="mb-4 self-center">
            <View
              className="rounded-full px-4 py-1"
              style={{ backgroundColor: latencyColour(latencyMs) + '22' }}
            >
              <Text
                className="text-xs"
                style={{
                  fontFamily: 'IBMPlexMono_400Regular',
                  color: latencyColour(latencyMs),
                }}
              >
                ⏱ {latencyMs} ms response latency
              </Text>
            </View>
          </View>
        ) : null}

        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="rounded-xl border border-brand-ink px-5 py-3"
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text
              className="text-sm font-semibold text-brand-stone"
              style={{ fontFamily: 'NotoSansJP_500Medium' }}
            >
              End
            </Text>
          </TouchableOpacity>

          <VoiceButton
            isListening={state === 'listening'}
            onPress={() => {
              if (state === 'listening') {
                stopListening();
              } else if (state === 'idle') {
                startListening();
              }
            }}
          />

          <View className="w-16" />
        </View>
      </View>
    </SafeAreaView>
  );
}
