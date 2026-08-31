import { Stack } from 'expo-router';
import { AuthProvider } from '@/components/auth-context';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
