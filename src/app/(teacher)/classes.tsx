import { ScrollView, Text, View } from 'react-native';
import { dashboardStyles } from '@/components/dashboard-ui';

export default function TeacherClasses() {
  return (
    <ScrollView style={dashboardStyles.screen} contentContainerStyle={dashboardStyles.content}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0F172A', marginTop: 18 }}>Sınıflarım</Text>
      <Text style={{ color: '#64748B', marginTop: 6 }}>Öğretmenin sınıfları burada listelenecek.</Text>
      {['10-A (32 öğrenci)', '11-B (28 öğrenci)', '12-C (26 öğrenci)'].map((c) => (
        <View key={c} style={dashboardStyles.card}><Text style={dashboardStyles.title}>{c}</Text><Text style={dashboardStyles.detail}>Detaylar yakında</Text></View>
      ))}
    </ScrollView>
  );
}
