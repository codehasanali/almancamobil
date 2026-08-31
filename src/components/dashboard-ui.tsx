import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/components/auth-context';

export function DashboardHeader({ name, role }: { name: string; role: string }) {
  const { signOut } = useAuth();
  return <View style={styles.header}><View><Text style={styles.greeting}>Merhaba, {name} 👋</Text><Text style={styles.role}>{role} panelin</Text></View><Pressable onPress={() => { signOut(); router.replace('/'); }} style={styles.logout}><Text style={styles.logoutText}>Çıkış</Text></Pressable></View>;
}
export function StatCard({ value, label, color = '#2563EB' }: { value: string; label: string; color?: string }) { return <View style={styles.stat}><Text style={[styles.statValue, { color }]}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>; }
export function SectionTitle({ children }: { children: string }) { return <Text style={styles.sectionTitle}>{children}</Text>; }
export const dashboardStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' }, content: { padding: 20, paddingBottom: 40, maxWidth: 760, width: '100%', alignSelf: 'center' }, stats: { flexDirection: 'row', gap: 10, marginVertical: 22 }, card: { backgroundColor: '#FFF', borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', padding: 18, marginTop: 10 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, title: { color: '#0F172A', fontSize: 16, fontWeight: '700' }, detail: { color: '#64748B', fontSize: 13, marginTop: 6 }, badge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#DBEAFE' }, badgeText: { color: '#1D4ED8', fontSize: 12, fontWeight: '700' }, progress: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 8, marginTop: 14, overflow: 'hidden' },
});
const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18 }, greeting: { color: '#0F172A', fontSize: 24, fontWeight: '800' }, role: { color: '#64748B', fontSize: 14, marginTop: 4 }, logout: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: 10, backgroundColor: '#EEF2FF' }, logoutText: { color: '#3730A3', fontWeight: '700', fontSize: 13 }, stat: { flex: 1, minHeight: 84, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, padding: 13, justifyContent: 'center' }, statValue: { fontSize: 21, fontWeight: '800' }, statLabel: { color: '#64748B', fontSize: 11, lineHeight: 15, marginTop: 3 }, sectionTitle: { color: '#0F172A', fontSize: 17, fontWeight: '800', marginTop: 10, marginBottom: 3 },
});
