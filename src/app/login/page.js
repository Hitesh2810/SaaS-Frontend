"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.email.includes("@") || form.password.length < 6) {
      setError("Enter a valid email and a password with at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await login(form);
    } catch {
      setError("Unable to sign in with those credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="premium-gradient relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <FloatingParticles count={34} />
      <motion.div className="absolute inset-0 opacity-70" animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }} transition={{ duration: 16, repeat: Infinity }} />
      <Card className="relative w-full max-w-md p-7" interactive>
        <motion.div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-white text-slate-950 shadow-glow" animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <Sparkles className="h-6 w-6" />
        </motion.div>
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-semibold">Sourcesys Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to the enterprise control plane.</p>
        </div>
        <form className="mt-7 grid gap-4" onSubmit={onSubmit}>
          <label className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" type="email" placeholder="admin@example.com" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          </label>
          <label className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 pr-11" type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
          </label>
          {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
          <Button className="h-11" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
        </form>
      </Card>
    </main>
  );
}
