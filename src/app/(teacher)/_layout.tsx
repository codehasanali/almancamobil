import { Tabs, router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/components/auth-context';

export default function TeacherLayout() {
  const { role, isRestoring } = useAuth();

  useEffect(() => {
    if (!isRestoring && role !== 'teacher') {
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
  if (role !== 'teacher') return null;

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2563EB' }}>
      <Tabs.Screen name="index" options={{ title: 'Ana Sayfa' }} />
      <Tabs.Screen name="classes" options={{ title: 'Sınıflarım' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
