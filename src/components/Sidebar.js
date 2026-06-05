"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const width = collapsed ? 84 : 276;

  const content = (
    <>
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div animate={{ rotate: [0, 10, -6, 0] }} transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 5 }} className="grid h-10 w-10 place-items-center rounded-lg premium-gradient text-white shadow-glow">
            <Sparkles className="h-5 w-5" />
          </motion.div>
          {!collapsed ? <span className="text-sm font-semibold">Sourcesys Admin</span> : null}
        </Link>
        <Button className="lg:hidden" size="icon" variant="ghost" onClick={() => setMobileOpen(false)}><X className="h-4 w-4" /></Button>
      </div>
      <nav className="mt-4 space-y-1 px-3">
        {navigation.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn("group relative flex h-11 items-center gap-3 rounded-md px-3 text-sm transition", active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}>
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed ? <span>{item.label}</span> : null}
              {active ? <motion.span layoutId="active-nav" className="absolute inset-0 -z-10 rounded-md bg-primary" /> : null}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-3">
        <Button variant="outline" className="hidden w-full lg:flex" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed ? "Collapse" : null}
        </Button>
      </div>
    </>
  );

  return (
    <>
      <motion.aside animate={{ width }} className="glass fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] flex-col rounded-lg lg:flex">
        {content}
      </motion.aside>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <motion.aside initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }} className="glass relative h-full w-72 rounded-r-lg">
            {content}
          </motion.aside>
        </div>
      ) : null}
    </>
  );
}
