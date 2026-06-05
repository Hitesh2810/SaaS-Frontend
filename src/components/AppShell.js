"use client";

import { useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import LoadingState from "@/components/LoadingState";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isBooting } = useProtectedRoute();

  if (isBooting) return <LoadingState label="Securing session" />;
  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FloatingParticles count={14} />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={collapsed ? "relative px-4 pb-8 transition-all duration-300 md:px-8 lg:ml-[116px]" : "relative px-4 pb-8 transition-all duration-300 md:px-8 lg:ml-[308px]"}>
        <Navbar onMenuClick={() => setMobileOpen(true)} />
        {children}
      </main>
    </div>
  );
}
