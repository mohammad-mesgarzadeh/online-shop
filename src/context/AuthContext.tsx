import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import type { User, AuthState } from "../types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string, remember: boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "vesta_users";
const CURRENT_USER_KEY = "vesta_current_user";

function getStoredUsers(): Record<string, { user: User; password: string }> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeUsers(users: Record<string, { user: User; password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function createAvatar(name: string): string {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6C63FF&color=fff&bold=true&size=128`;
}

function getInitialAuthState(): AuthState {
  const saved = localStorage.getItem(CURRENT_USER_KEY) || sessionStorage.getItem(CURRENT_USER_KEY);
  if (saved) {
    try {
      const user: User = JSON.parse(saved);
      return { user, isAuthenticated: true, isLoading: false };
    } catch {
      localStorage.removeItem(CURRENT_USER_KEY);
      sessionStorage.removeItem(CURRENT_USER_KEY);
    }
  }
  return { user: null, isAuthenticated: false, isLoading: false };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(getInitialAuthState);

  const login = useCallback(async (email: string, password: string, remember: boolean): Promise<boolean> => {
    setState((s) => ({ ...s, isLoading: true }));
    await new Promise((r) => setTimeout(r, 800));

    const users = getStoredUsers();
    const entry = users[email.toLowerCase()];

    if (!entry || entry.password !== password) {
      setState((s) => ({ ...s, isLoading: false }));
      return false;
    }

    if (remember) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(entry.user));
      sessionStorage.removeItem(CURRENT_USER_KEY);
    } else {
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(entry.user));
      localStorage.removeItem(CURRENT_USER_KEY);
    }

    setState({ user: entry.user, isAuthenticated: true, isLoading: false });
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    setState((s) => ({ ...s, isLoading: true }));
    await new Promise((r) => setTimeout(r, 800));

    const users = getStoredUsers();
    if (users[email.toLowerCase()]) {
      setState((s) => ({ ...s, isLoading: false }));
      return false;
    }

    const newUser: User = {
      id: generateId(),
      name,
      email: email.toLowerCase(),
      phone: "",
      avatar: createAvatar(name),
      createdAt: new Date().toISOString(),
    };

    users[email.toLowerCase()] = { user: newUser, password };
    storeUsers(users);

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setState({ user: newUser, isAuthenticated: true, isLoading: false });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setState((s) => {
      if (!s.user) return s;
      const updated = { ...s.user, ...updates };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));

      const users = getStoredUsers();
      if (users[updated.email]) {
        users[updated.email].user = updated;
        storeUsers(users);
      }

      return { ...s, user: updated };
    });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
