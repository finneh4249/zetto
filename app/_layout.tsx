import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
} from '@expo-google-fonts/noto-sans-jp';
import { IBMPlexMono_400Regular } from '@expo-google-fonts/ibm-plex-mono';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  const [loaded, error] = useFonts({
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
    IBMPlexMono_400Regular,
  });

  useEffect(() => {
    async function checkAuth() {
      if (!loaded && !error) return;

      try {
        const token = await AsyncStorage.getItem('zetto_auth_token');
        const inAuthGroup = segments[0] === 'dashboard' || segments[0] === 'session' || segments[0] === 'audit';

        if (token && !inAuthGroup) {
          // Logged in but on landing/login
          router.replace('/dashboard');
        } else if (!token && inAuthGroup) {
          // Not logged in but accessing protected route
          router.replace('/');
        }
      } catch (e) {
        console.error('Auth state error', e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    checkAuth();
  }, [loaded, error, segments]);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0D0D0D' },
          headerTintColor: '#E8E4DF',
          headerTitleStyle: { fontWeight: 'bold', fontFamily: 'NotoSansJP_700Bold' },
          contentStyle: { backgroundColor: '#0D0D0D' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Log In', headerBackVisible: true }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="session" options={{ title: 'Practice Session', headerBackVisible: true }} />
        <Stack.Screen name="audit" options={{ title: 'Weekly Audit', headerBackVisible: true }} />
      </Stack>
    </QueryClientProvider>
  );
}
