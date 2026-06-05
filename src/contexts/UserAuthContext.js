"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { toast } from "sonner";
import { firebaseAuth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";
import api, { apiErrorMessage, tokenStore } from "@/lib/api";

const UserAuthContext = createContext(null);

function cacheUser(user) {
  if (typeof window === "undefined") return;
  if (user) localStorage.setItem("currentUser", JSON.stringify(user));
}

function splitDisplayName(displayName) {
  const parts = (displayName || "").trim().split(" ").filter(Boolean);
  return {
    first_name: parts[0] || "",
    last_name: parts.slice(1).join(" ")
  };
}

function googlePassword(uid) {
  return `Google-${uid}-Sourcesys-2026!`;
}

function googleUsername(email, uid) {
  const base = (email || "google-user").split("@", 1)[0].replace(/[^A-Za-z0-9_]/g, "");
  return `${base || "google"}_${uid.slice(0, 8)}`;
}

export function UserAuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const cached = typeof window !== "undefined" ? localStorage.getItem("currentUser") : null;
    if (cached) {
      try {
        setUser(JSON.parse(cached));
      } catch {
        localStorage.removeItem("currentUser");
      }
    }

    if (!tokenStore.getAccess()) {
      setIsBooting(false);
      return;
    }

    api.get("/auth/me/")
      .then((response) => {
        setUser(response.data);
        cacheUser(response.data);
      })
      .catch(() => tokenStore.clear())
      .finally(() => setIsBooting(false));
  }, []);

  async function refreshUser() {
    const response = await api.get("/auth/me/");
    setUser(response.data);
    cacheUser(response.data);
    return response.data;
  }

  async function login(credentials, options = {}) {
    try {
      const response = await api.post("/auth/login/", credentials);
      tokenStore.set(response.data.access, response.data.refresh);
      const profile = response.data.user || (await refreshUser());
      setUser(profile);
      cacheUser(profile);
      if (options.remember) localStorage.setItem("rememberUser", credentials.email);
      toast.success("Welcome back");
      router.push("/user/dashboard");
    } catch (error) {
      toast.error(apiErrorMessage(error));
      throw error;
    }
  }

  async function signup(payload) {
    try {
      await api.post("/auth/register/", payload);
      await login({ email: payload.email, password: payload.password }, { remember: true });
      toast.success("Account created");
    } catch (error) {
      toast.error(apiErrorMessage(error));
      throw error;
    }
  }

  async function loginWithGoogle() {
    try {
      if (!isFirebaseConfigured || !firebaseAuth || !googleProvider) {
        throw new Error("Google sign-in is not configured. Add your Firebase web app values to .env.local and restart the dev server.");
      }

      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const firebaseUser = result.user;
      const googleUser = {
        displayName: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
        photoURL: firebaseUser.photoURL || ""
      };

      if (!googleUser.email) throw new Error("Google account did not return an email address.");

      const password = googlePassword(googleUser.uid);
      const names = splitDisplayName(googleUser.displayName);
      const registerPayload = {
        username: googleUsername(googleUser.email, googleUser.uid),
        email: googleUser.email,
        password,
        first_name: names.first_name,
        last_name: names.last_name,
        role: "USER"
      };

      try {
        await api.post("/auth/register/", registerPayload);
      } catch (error) {
        if (error?.response?.status !== 400) throw error;
      }

      const response = await api.post("/auth/login/", { email: googleUser.email, password });
      tokenStore.set(response.data.access, response.data.refresh);
      const profile = response.data.user || (await refreshUser());
      setUser(profile);
      cacheUser(profile);
      localStorage.setItem("firebaseUser", JSON.stringify(googleUser));
      localStorage.setItem("rememberUser", googleUser.email);
      toast.success("Signed in with Google");
      router.push("/user/dashboard");
      return { firebaseUser: googleUser, user: profile };
    } catch (error) {
      toast.error(apiErrorMessage(error));
      throw error;
    }
  }

  async function updateProfile(payload) {
    const response = await api.patch("/auth/me/", payload);
    setUser(response.data);
    cacheUser(response.data);
    toast.success("Profile updated");
    return response.data;
  }

  async function changePassword(payload) {
    await api.post("/auth/change-password/", payload);
    toast.success("Password changed");
  }

  function logout() {
    api.post("/auth/logout/", { refresh: tokenStore.getRefresh() }).catch(() => null);
    tokenStore.clear();
    setUser(null);
    router.push("/user/login");
  }

  useEffect(() => {
    const publicPath = pathname === "/user/login" || pathname === "/user/signup";
    if (!isBooting && !tokenStore.getAccess() && pathname?.startsWith("/user") && !publicPath) {
      router.replace("/user/login");
    }
  }, [isBooting, pathname, router]);

  const value = useMemo(() => ({
    user,
    isBooting,
    isAuthenticated: Boolean(tokenStore.getAccess()),
    login,
    loginWithGoogle,
    isGoogleAuthConfigured: isFirebaseConfigured,
    signup,
    logout,
    refreshUser,
    updateProfile,
    changePassword
  }), [user, isBooting]);

  return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("useUserAuth must be used inside UserAuthProvider");
  return context;
}
