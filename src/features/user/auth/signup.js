"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { apiErrorMessage } from "@/lib/api";
import { useUserAuth } from "@/contexts/UserAuthContext";
import GoogleAuthButton from "./googleAuth";
import UserAuthShell from "./UserAuthShell";

function strength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export default function UserSignup() {
  const { signup } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", first_name: "", last_name: "", email: "", password: "", confirmPassword: "" });
  const score = useMemo(() => strength(form.password), [form.password]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.email.includes("@")) return setError("Enter a valid email address.");
    if (!form.username.trim()) return setError("Choose a username.");
    if (score < 3) return setError("Use a stronger password with 8+ characters, a number, and a capital letter.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (!terms) return setError("Accept the terms to continue.");
    setLoading(true);
    try {
      await signup({
        username: form.username,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        password: form.password,
        role: "USER"
      });
    } catch (err) {
      setError(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserAuthShell title="Create your account" subtitle="Start your customer workspace in a few seconds." mode="signup">
      <form className="mt-7 grid gap-3" onSubmit={onSubmit}>
        <label className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9" placeholder="Username" value={form.username} onChange={(event) => update("username", event.target.value)} />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input className="h-11" placeholder="First name" value={form.first_name} onChange={(event) => update("first_name", event.target.value)} />
          <Input className="h-11" placeholder="Last name" value={form.last_name} onChange={(event) => update("last_name", event.target.value)} />
        </div>
        <label className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9" type="email" placeholder="you@company.com" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>
        <label className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9 pr-11" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={(event) => update("password", event.target.value)} />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </label>
        <Input className="h-11" type={showPassword ? "text" : "password"} placeholder="Confirm password" value={form.confirmPassword} onChange={(event) => update("confirmPassword", event.target.value)} />
        <div className="grid gap-2">
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((item) => <span key={item} className={item < score ? "h-1.5 rounded-full bg-accent" : "h-1.5 rounded-full bg-muted"} />)}
          </div>
          <span className="text-xs text-muted-foreground">{["Very weak", "Weak", "Good", "Strong", "Excellent"][score]}</span>
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input className="mt-1 h-4 w-4 accent-slate-950" type="checkbox" checked={terms} onChange={(event) => setTerms(event.target.checked)} />
          I agree to the terms and privacy policy.
        </label>
        {error ? <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</motion.p> : null}
        <Button className="h-11" disabled={loading}>{loading ? "Creating account..." : "Create account"}</Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleAuthButton />
    </UserAuthShell>
  );
}
