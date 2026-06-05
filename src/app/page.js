"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingState from "@/components/LoadingState";
import { tokenStore } from "@/lib/api";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(tokenStore.getAccess() ? "/user/dashboard" : "/user/login");
  }, [router]);

  return <LoadingState label="Opening portal" />;
}
