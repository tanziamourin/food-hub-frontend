"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  emailVerified: boolean;
  image?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

const refresh = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      credentials: "include", 
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    setUser(data.data);
  } catch (err) {
    console.error("Failed to refresh user:", err);
    setUser(null);
  }
};


  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!mounted) return;
      await refresh();
      if (mounted) setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

 const logout = async () => {
  await fetch("http://localhost:5000/api/auth/sign-out", {
    method: "POST",
    credentials: "include",
  });

  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, loading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
