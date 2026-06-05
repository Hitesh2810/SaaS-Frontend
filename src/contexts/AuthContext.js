"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api, { apiErrorMessage, tokenStore } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const cached = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
    if (cached) setUser(JSON.parse(cached));
    if (tokenStore.getAccess()) {
      api.get("/auth/me/")
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("currentUser", JSON.stringify(response.data));
        })
        .catch(() => tokenStore.clear())
        .finally(() => setIsBooting(false));
    } else {
      setIsBooting(false);
    }
  }, []);

  async function login(credentials) {
    try {
      const response = await api.post("/auth/login/", credentials);
      tokenStore.set(response.data.access, response.data.refresh);
      const profile = response.data.user || response.data.profile || null;
      if (profile) {
        setUser(profile);
        localStorage.setItem("currentUser", JSON.stringify(profile));
      } else {
        const me = await api.get("/auth/me/");
        setUser(me.data);
        localStorage.setItem("currentUser", JSON.stringify(me.data));
      }
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (error) {
      toast.error(apiErrorMessage(error));
      throw error;
    }
  }

  function logout() {
    api.post("/auth/logout/").catch(() => null);
    tokenStore.clear();
    setUser(null);
    router.push("/login");
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(tokenStore.getAccess()),
    isBooting,
    login,
    logout
  }), [user, isBooting]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
