import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0A0A0A' },
          headerTintColor: '#F9FAFB',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#0A0A0A' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Zetto' }} />
        <Stack.Screen name="session" options={{ title: 'Practice Session' }} />
        <Stack.Screen name="audit" options={{ title: 'Weekly Audit' }} />
      </Stack>
    </QueryClientProvider>
  );
}
