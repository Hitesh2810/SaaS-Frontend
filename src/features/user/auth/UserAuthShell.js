"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FloatingParticles from "@/components/FloatingParticles";
import { useTheme } from "@/contexts/ThemeContext";

export default function UserAuthShell({ title, subtitle, children, mode }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <main className="premium-gradient relative min-h-screen overflow-hidden px-4 py-8">
      <FloatingParticles count={42} />
      <motion.div
        className="absolute inset-0 opacity-80"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <motion.section initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="hidden text-white lg:block">
            <div className="mb-6 grid h-14 w-14 place-items-center rounded-lg bg-white/18 shadow-glow backdrop-blur">
              <Sparkles className="h-7 w-7" />
            </div>
            <h1 className="max-w-xl text-5xl font-semibold leading-tight">Sourcesys customer portal</h1>
            <p className="mt-5 max-w-lg text-lg text-white/78">Manage your subscription, payments, profile, and notifications from one polished workspace.</p>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {["Live sync", "Secure JWT", "Self service"].map((item) => (
                <div key={item} className="rounded-lg border border-white/20 bg-white/10 p-4 text-sm backdrop-blur">{item}</div>
              ))}
            </div>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 22, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="glass mx-auto w-full max-w-md rounded-lg p-6 shadow-glass">
            <div className="mb-6 flex items-center justify-between">
              <Link href="/" className="text-sm font-semibold">Sourcesys</Link>
              <button type="button" onClick={toggleTheme} className="rounded-md border border-white/20 px-3 py-2 text-xs font-medium">
                {theme === "dark" ? "Light" : "Dark"}
              </button>
            </div>
            <div>
              <h2 className="text-3xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? "New here? " : "Already have an account? "}
              <Link className="font-semibold text-foreground" href={mode === "login" ? "/user/signup" : "/user/login"}>
                {mode === "login" ? "Create account" : "Sign in"}
              </Link>
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
