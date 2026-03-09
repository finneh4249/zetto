import { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface VoiceButtonProps {
  isListening: boolean;
  onPress: () => void;
}

export function VoiceButton({ isListening, onPress }: VoiceButtonProps) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
    }
  }, [isListening, pulseAnim]);

  const ringScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.55],
  });
  const ringOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  return (
    <View className="items-center justify-center">
      {/* Pulsing ring — only rendered while listening */}
      {isListening && (
        <Animated.View
          style={{
            position: 'absolute',
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: '#D94032',
            transform: [{ scale: ringScale }],
            opacity: ringOpacity,
          }}
        />
      )}

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className={`h-16 w-16 items-center justify-center rounded-full ${
          isListening ? 'bg-red-600' : 'bg-brand-vermilion'
        }`}
        style={{ elevation: 6 }}
        accessibilityRole="button"
        accessibilityLabel={isListening ? 'Stop voice recording' : 'Start voice recording'}
        accessibilityHint={
          isListening ? 'Double tap to stop voice input' : 'Double tap to start voice input'
        }
      >
        {isListening ? (
          <View className="flex-row items-end gap-0.5">
            <View className="h-5 w-1.5 rounded-full bg-white" />
            <View className="h-7 w-1.5 rounded-full bg-white" />
            <View className="h-4 w-1.5 rounded-full bg-white" />
          </View>
        ) : (
          <Text className="text-3xl">🎙</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
