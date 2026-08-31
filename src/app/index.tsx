import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '@/components/auth-context';

export default function LoginScreen() {
  const { signInWithCredentials, isLoading, isRestoring, role } = useAuth();

  useEffect(() => {
    if (!isRestoring && role) {
      router.replace((role === 'teacher' ? '/(teacher)' : '/(student)') as any);
    }
  }, [isRestoring, role]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Kullanıcı adı ve şifre girin.');
      return;
    }
    if (password.length < 8) {
      setError('Şifre en az 8 karakter olmalı.');
      return;
    }
    setError('');
    try {
      const role = await signInWithCredentials(username, password);
      // role -> backend'den gelen gerçek role göre yönlendir
      router.replace((role === 'teacher' ? '/(teacher)' : '/(student)') as any);
    } catch (e: any) {
      const msg = e?.message ?? 'Giriş başarısız. Bilgilerinizi kontrol edin.';
      setError(msg);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>DeutschZeit</Text>
      <Text style={styles.subtitle}>Kullanıcı adın ve şifrenle giriş yap</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Kullanıcı adı"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        editable={!isLoading}
        onSubmitEditing={onLogin}
        returnKeyType="next"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Şifre"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        style={styles.input}
        editable={!isLoading}
        onSubmitEditing={onLogin}
        returnKeyType="done"
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        onPress={onLogin}
        disabled={isLoading}
        style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }, isLoading && { opacity: 0.6 }]}
      >
        {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>Giriş Yap</Text>}
      </Pressable>

      <Text style={styles.hint}>API: api.deutschzeit.com/api/auth/login</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', padding: 24, gap: 12, maxWidth: 400, width: '100%', alignSelf: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 8 },
  input: { height: 44, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, paddingHorizontal: 12, fontSize: 15, backgroundColor: '#FFF', color: '#0F172A' },
  error: { color: '#DC2626', fontSize: 13, textAlign: 'center' },
  btn: { backgroundColor: '#2563EB', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  btnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },
  hint: { fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 8 },
});
