import { Text, TouchableOpacity, View } from 'react-native';

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
}

export function VoiceButton({ isListening, onPress }: VoiceButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className={`h-16 w-16 items-center justify-center rounded-full ${
        isListening ? 'bg-red-500' : 'bg-brand-accent'
      }`}
      style={{ elevation: 4 }}
    >
      {isListening ? (
        <View className="flex-row items-end gap-0.5">
          {/* Animated bars visualiser placeholder */}
          <View className="h-5 w-1.5 rounded-full bg-white" />
          <View className="h-7 w-1.5 rounded-full bg-white" />
          <View className="h-4 w-1.5 rounded-full bg-white" />
        </View>
      ) : (
        <Text className="text-2xl">🎙</Text>
      )}
    </TouchableOpacity>
  );
}
