import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useAuth } from '@/components/auth-context';
import { dashboardStyles } from '@/components/dashboard-ui';

export default function TeacherProfile() {
  const { user, signOut } = useAuth();
  const onLogout = async () => {
    await signOut();
    router.replace('/' as any);
  };
  return (
    <ScrollView style={dashboardStyles.screen} contentContainerStyle={dashboardStyles.content}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0F172A', marginTop: 18 }}>Profil</Text>
      <View style={dashboardStyles.card}>
        <Text style={dashboardStyles.title}>{user?.name ?? 'Ayşe Öğretmen'}</Text>
        <Text style={dashboardStyles.detail}>{user?.email ?? 'ogretmen@okul.com'}</Text>
        {user?.username ? <Text style={dashboardStyles.detail}>@{user.username}</Text> : null}
        <Text style={[dashboardStyles.detail, { marginTop: 10 }]}>Rol: Öğretmen</Text>
      </View>
      <Pressable onPress={onLogout} style={{ marginTop: 16, backgroundColor: '#DC2626', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#FFF', fontWeight: '700' }}>Çıkış Yap</Text>
      </Pressable>
    </ScrollView>
  );
}
