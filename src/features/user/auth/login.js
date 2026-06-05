"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { apiErrorMessage } from "@/lib/api";
import { useUserAuth } from "@/contexts/UserAuthContext";
import GoogleAuthButton from "./googleAuth";
import UserAuthShell from "./UserAuthShell";

export default function UserLogin() {
  const { login } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberUser");
    if (remembered) setForm((current) => ({ ...current, email: remembered }));
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.email.includes("@")) return setError("Enter a valid email address.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true);
    try {
      await login(form, { remember });
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserAuthShell title="Welcome back" subtitle="Sign in to manage your SaaS account." mode="login">
      <form className="mt-7 grid gap-4" onSubmit={onSubmit}>
        <label className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9" type="email" placeholder="you@company.com" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
        </label>
        <label className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9 pr-11" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </label>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input className="h-4 w-4 rounded border-white/30 accent-slate-950" type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Remember me
          </label>
          <button type="button" className="font-medium text-foreground">Forgot password?</button>
        </div>
        {error ? <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</motion.p> : null}
        <Button className="h-11" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleAuthButton />
    </UserAuthShell>
  );
}
