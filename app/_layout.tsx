import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { palette } from '@/src/art/palette';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: palette.uiBg },
          headerTintColor: palette.ui,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: palette.uiBg },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="district/[id]"
          options={{ presentation: 'card', title: '' }}
        />
      </Stack>
    </>
  );
}
