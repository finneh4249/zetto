import { Text, TouchableOpacity, View } from 'react-native';

import type { TranscriptEntry } from '@/types';

interface TranscriptViewProps {
  entry: TranscriptEntry;
}

export function TranscriptView({ entry }: TranscriptViewProps) {
  const isAI = entry.speaker === 'ai';

  return (
    <View
      className={`mb-3 max-w-xs rounded-2xl px-4 py-3 ${
        isAI
          ? 'self-start rounded-tl-sm bg-brand-surface'
          : 'self-end rounded-tr-sm bg-brand-accent'
      }`}
    >
      {isAI && (
        <Text className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-accent">
          Zetto
        </Text>
      )}

      {/* Render words — tap for JIT translation */}
      <View className="flex-row flex-wrap gap-x-1">
        {entry.words.map((word) => (
          <TouchableOpacity
            key={word.id}
            onPress={word.onPress}
            activeOpacity={word.onPress ? 0.6 : 1}
          >
            <View>
              {word.furigana ? (
                <Text className="text-center text-xs text-brand-text-secondary">
                  {word.furigana}
                </Text>
              ) : null}
              <Text
                className={`text-base ${
                  isAI ? 'text-brand-text' : 'text-brand-bg'
                } ${word.isError ? 'underline decoration-red-400' : ''}`}
              >
                {word.surface}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {entry.translation ? (
        <Text className="mt-2 text-xs italic text-brand-text-secondary">
          {entry.translation}
        </Text>
      ) : null}

      <Text
        className={`mt-1 text-right text-xs ${
          isAI ? 'text-brand-text-secondary' : 'text-brand-bg opacity-60'
        }`}
      >
        {entry.timestamp}
      </Text>
    </View>
  );
}
