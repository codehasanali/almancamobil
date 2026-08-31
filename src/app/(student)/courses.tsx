import { ScrollView, Text, View } from 'react-native';
import { dashboardStyles } from '@/components/dashboard-ui';

export default function StudentCourses() {
  return (
    <ScrollView style={dashboardStyles.screen} contentContainerStyle={dashboardStyles.content}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: '#0F172A', marginTop: 18 }}>Derslerim</Text>
      <Text style={{ color: '#64748B', marginTop: 6 }}>Kayıtlı derslerin burada görünecek.</Text>
      {['Matematik', 'Fizik', 'Tarih', 'İngilizce', 'Biyoloji'].map((c) => (
        <View key={c} style={dashboardStyles.card}><Text style={dashboardStyles.title}>{c}</Text><Text style={dashboardStyles.detail}>İlerleme yakında</Text></View>
      ))}
    </ScrollView>
  );
}
