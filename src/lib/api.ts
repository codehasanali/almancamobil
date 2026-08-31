// src/lib/api.ts
export const API_BASE_URL = 'https://api.deutschzeit.com';

export type ApiLoginRequest = {
  username: string;
  password: string;
};

// Backend rol alanı farklı gelebilir: role | user.role | data.role | authorities vs.
// Hepsini normalize ediyoruz.
export type NormalizedRole = 'teacher' | 'student';

export type LoginResponseRaw = any;

export type LoginResult = {
  token: string | null;
  role: NormalizedRole;
  user: {
    id?: string | number;
    username: string;
    name: string;
    email?: string;
    role: NormalizedRole;
  };
  raw: any;
};

function normalizeRole(rawRole: any): NormalizedRole | null {
  if (!rawRole) return null;
  const r = String(rawRole).toLowerCase().trim();
  // yaygın varyasyonlar
  if (r === 'teacher' || r === 'ogretmen' || r === 'öğretmen' || r === 'role_teacher' || r === 'teacher_role' || r.includes('teacher')) return 'teacher';
  if (r === 'student' || r === 'ogrenci' || r === 'öğrenci' || r === 'role_student' || r === 'student_role' || r.includes('student')) return 'student';
  // tek harf / kısaltma? fallback yok
  return null;
}

function extractRole(data: any): NormalizedRole | null {
  if (!data || typeof data !== 'object') return null;
  // doğrudan alanlar
  const candidates = [
    data.role,
    data.user?.role,
    data.data?.role,
    data.data?.user?.role,
    data.user?.roles?.[0],
    data.roles?.[0],
    data.authorities?.[0],
    data.authority,
    data.data?.user?.roles?.[0],
  ];
  for (const c of candidates) {
    const r = typeof c === 'string' ? c : c?.authority ?? c?.role ?? c?.name ?? null;
    const n = normalizeRole(r);
    if (n) return n;
  }
  // authorities = ["ROLE_TEACHER"] gibi
  if (Array.isArray(data.authorities)) {
    for (const a of data.authorities) {
      const n = normalizeRole(typeof a === 'string' ? a : (a as any)?.authority);
      if (n) return n;
    }
  }
  if (Array.isArray(data.roles)) {
    for (const a of data.roles) {
      const n = normalizeRole(typeof a === 'string' ? a : (a as any)?.authority ?? (a as any)?.name);
      if (n) return n;
    }
  }
  return null;
}

function extractToken(data: any): string | null {
  if (!data || typeof data !== 'object') return null;
  return (
    data.token ??
    data.accessToken ??
    data.access_token ??
    data.jwt ??
    data.data?.token ??
    data.data?.accessToken ??
    data.data?.access_token ??
    data.data?.jwt ??
    (data.tokenData as any)?.token ??
    null
  ) as string | null;
}

function extractUser(data: any, fallbackUsername: string, fallbackRole: NormalizedRole): LoginResult['user'] {
  const u = data.user ?? data.data?.user ?? data.data ?? data ?? {};
  const username = u.username ?? u.userName ?? u.email ?? fallbackUsername;
  const name = u.name ?? u.fullName ?? u.displayName ?? u.username ?? fallbackUsername;
  const email = u.email ?? (username?.includes('@') ? username : undefined);
  return {
    id: u.id ?? u._id ?? u.userId,
    username: String(username),
    name: String(name),
    email: email ? String(email) : undefined,
    role: fallbackRole,
  };
}

export async function loginRequest({ username, password }: ApiLoginRequest): Promise<LoginResult> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }

  if (!res.ok) {
    const msg =
      data?.message ??
      data?.error ??
      data?.msg ??
      (typeof data === 'string' ? data : null) ??
      `Giriş başarısız (${res.status})`;
    // Detaylı hata için throw
    const err: any = new Error(msg);
    err.status = res.status;
    err.data = data;
    // TR: backend "Kullanıcı adı veya parola hatalı." dönüyor -> direkt göster
    throw err;
  }

  const role = extractRole(data);
  if (!role) {
    // Rol bulunamadıysa hata fırlat - backend mutlaka role dönmeli
    // Debug için raw'ı logla ama kullanıcıya genel mesaj göster
    console.warn('[login] role parse edilemedi, raw:', data);
    const err: any = new Error('Kullanıcı rolü belirlenemedi. Lütfen yöneticiyle iletişime geçin.');
    err.data = data;
    throw err;
  }

  const token = extractToken(data);
  const user = extractUser(data, username, role);

  return { token, role, user, raw: data };
}
