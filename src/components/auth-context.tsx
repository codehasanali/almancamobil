import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { loginRequest } from '@/lib/api';

export type UserRole = 'teacher' | 'student';
export type User = { role: UserRole; name: string; email: string; username: string; token?: string | null };

type AuthContextValue = {
  role: UserRole | null;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isRestoring: boolean;
  signIn: (user: User | UserRole) => void;
  signInWithCredentials: (username: string, password: string) => Promise<UserRole>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'auth_v1';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);

  const role = user?.role ?? null;

  // Restore session
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.user?.role) {
            setUser(parsed.user);
            setToken(parsed.token ?? null);
          }
        }
      } catch {}
      setIsRestoring(false);
    })();
  }, []);

  const persist = async (nextUser: User | null, nextToken: string | null) => {
    if (nextUser) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  // Eski mock signIn korunuyor (geriye uyumluluk)
  const signIn = (input: User | UserRole) => {
    if (typeof input === 'string') {
      const fallbackName = input === 'teacher' ? 'Ayşe Öğretmen' : 'Mehmet Öğrenci';
      const fallbackEmail = input === 'teacher' ? 'ogretmen@okul.com' : 'ogrenci@okul.com';
      const next: User = { role: input, name: fallbackName, email: fallbackEmail, username: fallbackEmail };
      setUser(next);
      setToken(null);
      persist(next, null);
    } else {
      setUser(input);
      persist(input, token);
    }
  };

  const signInWithCredentials = async (username: string, password: string): Promise<UserRole> => {
    setIsLoading(true);
    try {
      const result = await loginRequest({ username: username.trim(), password });
      const nextUser: User = {
        role: result.role,
        name: result.user.name,
        email: result.user.email ?? result.user.username,
        username: result.user.username,
        token: result.token,
      };
      setUser(nextUser);
      setToken(result.token);
      await persist(nextUser, result.token);
      return result.role;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ role, user, token, isLoading, isRestoring, signIn, signInWithCredentials, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
