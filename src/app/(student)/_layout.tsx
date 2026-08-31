import { Tabs, router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/components/auth-context';

export default function StudentLayout() {
  const { role, isRestoring } = useAuth();

  useEffect(() => {
    if (!isRestoring && role !== 'student') {
      router.replace('/' as any);
    }
  }, [role, isRestoring]);

  if (isRestoring) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (role !== 'student') return null;

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0F766E' }}>
      <Tabs.Screen name="index" options={{ title: 'Ana Sayfa' }} />
      <Tabs.Screen name="courses" options={{ title: 'Derslerim' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
