import { ScrollView, Text, View } from 'react-native';
import { useAuth } from '@/components/auth-context';
import { DashboardHeader, SectionTitle, StatCard, dashboardStyles } from '@/components/dashboard-ui';

export default function TeacherDashboard() {
  const { user } = useAuth();
  return (
    <ScrollView style={dashboardStyles.screen} contentContainerStyle={dashboardStyles.content}>
      <DashboardHeader name={user?.name ?? 'Ayşe Öğretmen'} role="Öğretmen" />

      <View style={dashboardStyles.stats}>
        <StatCard value="4" label="Aktif Sınıf" color="#2563EB" />
        <StatCard value="86" label="Toplam Öğrenci" color="#7C3AED" />
        <StatCard value="12" label="Bekleyen Ödev" color="#EA580C" />
      </View>

      <SectionTitle>Bugün</SectionTitle>
      <View style={dashboardStyles.card}>
        <View style={dashboardStyles.row}>
          <Text style={dashboardStyles.title}>10-A Matematik</Text>
          <View style={dashboardStyles.badge}><Text style={dashboardStyles.badgeText}>09:00</Text></View>
        </View>
        <Text style={dashboardStyles.detail}>Konu: Fonksiyonlar · Yoklama alınmadı</Text>
        <View style={dashboardStyles.progress}><View style={{ width: '68%', height: '100%', backgroundColor: '#2563EB', borderRadius: 8 }} /></View>
        <Text style={[dashboardStyles.detail, { marginTop: 6 }]}>Sınıf başarısı %68</Text>
      </View>

      <View style={dashboardStyles.card}>
        <View style={dashboardStyles.row}>
          <Text style={dashboardStyles.title}>11-B Fizik</Text>
          <View style={[dashboardStyles.badge, { backgroundColor: '#FEF3C7' }]}><Text style={[dashboardStyles.badgeText, { color: '#92400E' }]}>11:30</Text></View>
        </View>
        <Text style={dashboardStyles.detail}>Konu: Newton Yasaları · 3 ödev kontrol bekliyor</Text>
      </View>

      <SectionTitle>Son Aktiviteler</SectionTitle>
      <View style={dashboardStyles.card}>
        <Text style={dashboardStyles.title}>Ödev teslimleri</Text>
        <Text style={dashboardStyles.detail}>• Elif Y. - Matematik Ödev 3 (5 dk önce)</Text>
        <Text style={dashboardStyles.detail}>• Can K. - Fizik Raporu (1 saat önce)</Text>
        <Text style={dashboardStyles.detail}>• Zeynep D. - Matematik Ödev 3 (2 saat önce)</Text>
      </View>
    </ScrollView>
  );
}
