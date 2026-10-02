import { createContext, useContext, useState, type ReactNode } from 'react';
import type { MockUser } from '../types';

// No real auth provider yet — this just remembers a "signed in" name and
// email in localStorage so the account flow is clickable end to end.
const STORAGE_KEY = 'junmaisake.mockUser.v1';

function loadUser(): MockUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
}

interface AuthContextValue {
  user: MockUser | null;
  signIn: (user: MockUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(() => loadUser());

  function signIn(next: MockUser) {
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
