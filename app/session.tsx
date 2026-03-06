import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TranscriptView } from '@/components/TranscriptView';
import { VoiceButton } from '@/components/VoiceButton';
import { useSession } from '@/hooks/useSession';

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
    <SafeAreaView className="flex-1 bg-brand-bg" edges={['bottom']}>
      {/* Topic priming banner */}
      {topic ? (
        <View className="border-b border-brand-border bg-brand-surface px-6 py-3">
          <Text className="text-xs font-bold uppercase tracking-widest text-brand-accent">
            Topic
          </Text>
          <Text className="mt-0.5 text-base font-semibold text-brand-text">
            {topic}
          </Text>
        </View>
      ) : null}

      {/* Transcript */}
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-6"
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {transcript.length === 0 ? (
          <View className="mt-20 items-center">
            <Text className="text-6xl">🎙</Text>
            <Text className="mt-4 text-center text-lg text-brand-text">
              Ready to practise?
            </Text>
            <Text className="mt-2 text-center text-sm text-brand-text-secondary">
              Tap the microphone below to start speaking Japanese.
            </Text>
          </View>
        ) : (
          transcript.map((entry) => (
            <TranscriptView key={entry.id} entry={entry} />
          ))
        )}
      </ScrollView>

      {/* Bottom controls */}
      <View className="border-t border-brand-border bg-brand-surface px-6 py-5">
        {latencyMs !== null ? (
          <Text className="mb-3 text-center text-xs text-brand-text-secondary">
            Response latency: {latencyMs} ms
          </Text>
        ) : null}
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="rounded-lg border border-brand-border px-4 py-2"
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text className="text-sm text-brand-text-secondary">End</Text>
          </TouchableOpacity>

          <VoiceButton
            isListening={state === 'listening'}
            onPress={state === 'listening' ? stopListening : startListening}
          />

          <View className="w-16" />
        </View>
      </View>
    </SafeAreaView>
  );
}
