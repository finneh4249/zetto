import { useCallback, useEffect, useRef, useState } from 'react';

import type { SessionState, TranscriptEntry } from '@/types';
import { useGeminiRealtime } from './useGeminiRealtime';

/**
 * Manages a voice session lifecycle.
 *
 * Integrated with Gemini Multimodal Live API via useGeminiRealtime.
 */
export function useSession() {
  const { status, transcript: liveTranscript, isSpeaking, connect, disconnect, startRecording, stopRecording } = useGeminiRealtime();
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [topic, setTopic] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const promptStartRef = useRef<number | null>(null);
  useEffect(() => {
    if (status === 'connected') {
      setSessionState('idle');
      setTopic('Transit Tickets — きっぷ');
    } else if (status === 'error') {
      setSessionState('idle');
    }
  }, [status]);

  const startListening = useCallback(() => {
    if (status === 'disconnected') {
      connect();
    }
    
    setSessionState('listening');
    startRecording();
    promptStartRef.current = Date.now();
  }, [status, connect, startRecording]);

  const stopListening = useCallback(() => {
    if (promptStartRef.current !== null) {
      setLatencyMs(Date.now() - promptStartRef.current);
      promptStartRef.current = null;
    }
    stopRecording();
    setSessionState('processing');
  }, [stopRecording]);

  useEffect(() => {
    if (isSpeaking) {
      setSessionState('speaking');
    } else if (sessionState === 'speaking') {
      setSessionState('idle'); // Or 'listening' if appropriate
    }
  }, [isSpeaking, sessionState]);

  // Update transcript from live engine
  useEffect(() => {
    if (liveTranscript) {
      const entry: TranscriptEntry = {
        id: `ai-${Date.now()}`,
        speaker: 'ai',
        // Clean up text and convert to words
        words: liveTranscript.trim().split(/\s+/).map((w: string, i: number) => ({ id: `w${i}`, surface: w })),
        timestamp: new Date().toLocaleTimeString(),
      };
      setTranscript([entry]); // Single-task display
    }
  }, [liveTranscript]);

  return {
    state: sessionState,
    topic,
    transcript,
    latencyMs,
    startListening,
    stopListening,
  };
}
