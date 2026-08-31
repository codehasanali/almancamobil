import { ScrollView, Text, View } from 'react-native';
import { useAuth } from '@/components/auth-context';
import { DashboardHeader, SectionTitle, StatCard, dashboardStyles } from '@/components/dashboard-ui';

export default function StudentDashboard() {
  const { user } = useAuth();
  return (
    <ScrollView style={dashboardStyles.screen} contentContainerStyle={dashboardStyles.content}>
      <DashboardHeader name={user?.name ?? 'Mehmet Öğrenci'} role="Öğrenci" />

      <View style={dashboardStyles.stats}>
        <StatCard value="%72" label="Genel İlerleme" color="#0F766E" />
        <StatCard value="5" label="Aktif Ders" color="#2563EB" />
        <StatCard value="3" label="Teslim Bekleyen" color="#DC2626" />
      </View>

      <SectionTitle>Derslerim</SectionTitle>
      <View style={dashboardStyles.card}>
        <View style={dashboardStyles.row}>
          <Text style={dashboardStyles.title}>Matematik - Fonksiyonlar</Text>
          <View style={[dashboardStyles.badge, { backgroundColor: '#CCFBF1' }]}><Text style={[dashboardStyles.badgeText, { color: '#0F766E' }]}>%80</Text></View>
        </View>
        <Text style={dashboardStyles.detail}>Son test: 85/100 · Sıradaki: Ödev 4</Text>
        <View style={dashboardStyles.progress}><View style={{ width: '80%', height: '100%', backgroundColor: '#0F766E', borderRadius: 8 }} /></View>
      </View>

      <View style={dashboardStyles.card}>
        <View style={dashboardStyles.row}>
          <Text style={dashboardStyles.title}>Fizik - Newton Yasaları</Text>
          <View style={[dashboardStyles.badge, { backgroundColor: '#FEF3C7' }]}><Text style={[dashboardStyles.badgeText, { color: '#92400E' }]}>%45</Text></View>
        </View>
        <Text style={dashboardStyles.detail}>2 video kaldı · Quiz yarın</Text>
        <View style={dashboardStyles.progress}><View style={{ width: '45%', height: '100%', backgroundColor: '#EA580C', borderRadius: 8 }} /></View>
      </View>

      <View style={dashboardStyles.card}>
        <View style={dashboardStyles.row}>
          <Text style={dashboardStyles.title}>Tarih - Kurtuluş Savaşı</Text>
          <View style={[dashboardStyles.badge, { backgroundColor: '#DBEAFE' }]}><Text style={dashboardStyles.badgeText}>%92</Text></View>
        </View>
        <Text style={dashboardStyles.detail}>Tamamlandı ✓ · Sertifika hazır</Text>
        <View style={dashboardStyles.progress}><View style={{ width: '92%', height: '100%', backgroundColor: '#2563EB', borderRadius: 8 }} /></View>
      </View>

      <SectionTitle>Yaklaşan Görevler</SectionTitle>
      <View style={dashboardStyles.card}>
        <Text style={dashboardStyles.title}>Bu hafta</Text>
        <Text style={dashboardStyles.detail}>• Matematik Ödev 4 - Teslim: Cuma 23:59</Text>
        <Text style={dashboardStyles.detail}>• Fizik Quiz - Perşembe 14:00</Text>
        <Text style={dashboardStyles.detail}>• İngilizce Sunum - Pazartesi</Text>
      </View>
    </ScrollView>
  );
}
