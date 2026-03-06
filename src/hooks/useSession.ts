import { useCallback, useRef, useState } from 'react';

import type { SessionState, TranscriptEntry } from '@/types';

/**
 * Manages a voice session lifecycle.
 *
 * Phase 1 scaffold: state machine + simulated transcript entries.
 * Phase 2 will wire real Gemini Live API via WebSocket.
 */
export function useSession() {
  const [state, setState] = useState<SessionState>('idle');
  const [topic, setTopic] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const promptStartRef = useRef<number | null>(null);

  const startListening = useCallback(() => {
    setState('listening');
    promptStartRef.current = Date.now();

    if (transcript.length === 0) {
      // Prime the topic on first session start
      setTopic('Transit Tickets — きっぷ');
      // Simulate initial AI prompt
      setTimeout(() => {
        setState('speaking');
        const aiEntry: TranscriptEntry = {
          id: 'ai-0',
          speaker: 'ai',
          words: [
            { id: 'w0', surface: 'どこで' },
            { id: 'w1', surface: 'きっぷ' },
            { id: 'w2', surface: 'を' },
            { id: 'w3', surface: 'かいますか' },
            { id: 'w4', surface: '？' },
          ],
          timestamp: new Date().toLocaleTimeString(),
        };
        setTranscript((prev) => [...prev, aiEntry]);
        setTimeout(() => setState('listening'), 800);
      }, 600);
    }
  }, [transcript.length]);

  const stopListening = useCallback(() => {
    if (promptStartRef.current !== null) {
      setLatencyMs(Date.now() - promptStartRef.current);
      promptStartRef.current = null;
    }
    setState('processing');

    // Simulate user response being added to the transcript
    setTimeout(() => {
      const userEntry: TranscriptEntry = {
        id: `user-${Date.now()}`,
        speaker: 'user',
        words: [
          { id: 'uw0', surface: 'えきの' },
          { id: 'uw1', surface: 'みどりの' },
          { id: 'uw2', surface: 'まどぐち' },
          { id: 'uw3', surface: 'で' },
          { id: 'uw4', surface: 'かいます' },
          { id: 'uw5', surface: '。' },
        ],
        timestamp: new Date().toLocaleTimeString(),
      };
      setTranscript((prev) => [...prev, userEntry]);
      setState('idle');
    }, 500);
  }, []);

  return {
    state,
    topic,
    transcript,
    latencyMs,
    startListening,
    stopListening,
  };
}
