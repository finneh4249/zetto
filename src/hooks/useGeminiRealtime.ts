import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const MODEL = 'gemini-2.0-flash-exp'; // Using current known Live API model
const URL = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenericService/MultimodalLive?key=${API_KEY}`;

export type GeminiStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface GeminiMessage {
  id?: string;
  speaker: 'user' | 'ai';
  text?: string;
  audio?: string; // base64
  isInterrupted?: boolean;
}

export function useGeminiRealtime() {
  const [status, setStatus] = useState<GeminiStatus>('disconnected');
  const [transcript, setTranscript] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  
  // Audio state
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Playback queue
  const nextStartTimeRef = useRef<number>(0);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);

  const connect = useCallback(async () => {
    if (wsRef.current || !API_KEY) return;

    setStatus('connecting');
    const ws = new WebSocket(URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      // Send setup message
      const setup = {
        setup: {
          model: `models/${MODEL}`,
          generation_config: {
            response_modalities: ['AUDIO'],
            speech_config: {
              voice_config: {
                prebuilt_voice_config: {
                  voice_name: 'Aoede', // Breezy, good for Zetto
                },
              },
            },
          },
        },
      };
      ws.send(JSON.stringify(setup));
    };

    ws.onmessage = async (event) => {
      try {
        const response = JSON.parse(event.data);
        
        if (response.server_content) {
          const { model_turn } = response.server_content;
          if (model_turn?.parts) {
            for (const part of model_turn.parts) {
              if (part.text) {
                setTranscript((prev) => prev + part.text);
              }
              if (part.inline_data) {
                // Play audio chunk
                playAudioChunk(part.inline_data.data);
              }
            }
          }
          
          if (response.server_content.interrupted) {
            // Handle interruption (stop local playback)
            stopPlayback();
          }
        }
      } catch (err) {
        console.error('Error parsing Gemini message:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('Gemini WebSocket error:', err);
      setStatus('error');
    };

    ws.onclose = () => {
      setStatus('disconnected');
      wsRef.current = null;
    };
  }, []);

  const disconnect = useCallback(() => {
    wsRef.current?.close();
    stopRecording();
    stopPlayback();
  }, []);

  // --- Audio Recording (Web Only for now) ---
  const startRecording = useCallback(async () => {
    if (Platform.OS !== 'web') {
      console.warn('Real-time audio recording is currently only robust on Web.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32 to Int16 PCM
        const pcm16 = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        }
        
        // Send to WebSocket
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
          wsRef.current.send(JSON.stringify({
            realtime_input: {
              media_chunks: [{
                mime_type: 'audio/pcm;rate=16000',
                data: base64
              }]
            }
          }));
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    processorRef.current?.disconnect();
    audioContextRef.current?.close();
    streamRef.current = null;
    processorRef.current = null;
    audioContextRef.current = null;
  }, []);

  // --- Audio Playback (Web Only) ---
  const playAudioChunk = useCallback((base64: string) => {
    if (Platform.OS !== 'web') return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextStartTimeRef.current = audioContextRef.current.currentTime;
    }

    const ctx = audioContextRef.current;
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    
    const pcm16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(pcm16.length);
    for (let i = 0; i < pcm16.length; i++) {
      float32[i] = pcm16[i] / 0x7FFF;
    }

    const buffer = ctx.createBuffer(1, float32.length, 24000);
    buffer.getChannelData(0).set(float32);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);

    const startTime = Math.max(ctx.currentTime, nextStartTimeRef.current);
    source.start(startTime);
    nextStartTimeRef.current = startTime + buffer.duration;
    
    audioQueueRef.current.push(source);
    setIsSpeaking(true);
    source.onended = () => {
      audioQueueRef.current = audioQueueRef.current.filter(s => s !== source);
      if (audioQueueRef.current.length === 0) {
        setIsSpeaking(false);
      }
    };
  }, []);

  const stopPlayback = useCallback(() => {
    audioQueueRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    audioQueueRef.current = [];
    nextStartTimeRef.current = 0;
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return {
    status,
    transcript,
    isSpeaking,
    connect,
    disconnect,
    startRecording,
    stopRecording
  };
}
