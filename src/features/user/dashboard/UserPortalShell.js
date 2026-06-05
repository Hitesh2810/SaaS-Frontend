"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bell, CreditCard, LayoutDashboard, LogOut, Menu, Settings, Shield, User, Wallet, X } from "lucide-react";
import { useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import LoadingState from "@/components/LoadingState";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { useUserAuth } from "@/contexts/UserAuthContext";

const nav = [
  { href: "/user/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/profile", label: "Profile", icon: User },
  { href: "/user/subscription", label: "Subscription", icon: Shield },
  { href: "/user/payments", label: "Payments", icon: CreditCard },
  { href: "/user/notifications", label: "Notifications", icon: Bell },
  { href: "/user/settings", label: "Settings", icon: Settings }
];

export default function UserPortalShell({ children }) {
  const pathname = usePathname();
  const { user, isBooting, isAuthenticated, logout } = useUserAuth();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  if (isBooting) return <LoadingState label="Opening your portal" />;
  if (!isAuthenticated) return null;

  const navContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-foreground text-background"><Wallet className="h-5 w-5" /></div>
        <div>
          <p className="text-sm font-semibold">Sourcesys</p>
          <p className="text-xs text-muted-foreground">User Portal</p>
        </div>
      </div>
      <nav className="grid gap-1 px-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition", active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto grid gap-3 p-4">
        <button type="button" onClick={toggleTheme} className="rounded-md border bg-background/40 px-3 py-2 text-sm text-muted-foreground">
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <Button variant="outline" onClick={logout}><LogOut className="h-4 w-4" /> Logout</Button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticles count={14} />
      <aside className="glass fixed inset-y-4 left-4 z-30 hidden w-64 rounded-lg lg:block">{navContent}</aside>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-40 bg-black/40 lg:hidden">
          <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} className="glass h-full w-72 rounded-r-lg">
            <button className="absolute right-4 top-4" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
            {navContent}
          </motion.aside>
        </motion.div>
      ) : null}
      <main className="relative px-4 py-4 lg:ml-72 lg:px-8">
        <header className="mb-6 flex items-center justify-between rounded-lg border bg-background/50 px-4 py-3 backdrop-blur">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
          <div>
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="font-semibold">{user?.first_name || user?.username || user?.email}</p>
          </div>
          <div className="hidden rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground sm:block">{user?.tenant_name || "Customer workspace"}</div>
        </header>
        {children}
      </main>
    </div>
  );
}
