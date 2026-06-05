"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function useProtectedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isBooting } = useAuth();

  useEffect(() => {
    if (!isBooting && !isAuthenticated && pathname !== "/login") router.replace("/login");
  }, [isAuthenticated, isBooting, pathname, router]);

  return { isAuthenticated, isBooting };
}
