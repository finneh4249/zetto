import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

/**
 * Platform-aware storage adapter.
 *
 * On React Native (iOS / Android) we use AsyncStorage.
 * On web we use localStorage — but guard against the SSR/Node.js phase where
 * `window` / `localStorage` are not defined.
 */
const webStorage = {
  getItem: (key: string): Promise<string | null> => {
    if (typeof localStorage === 'undefined') return Promise.resolve(null);
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string): Promise<void> => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string): Promise<void> => {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const storage = Platform.OS === 'web' ? webStorage : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});