"use client";

import { Chrome } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useUserAuth } from "@/contexts/UserAuthContext";

export default function GoogleAuthButton() {
  const { loginWithGoogle, isGoogleAuthConfigured } = useUserAuth();
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);
    try {
      await loginWithGoogle();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full border-white/30 bg-white/70 text-slate-900 hover:bg-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      onClick={onClick}
      disabled={loading || !isGoogleAuthConfigured}
      title={isGoogleAuthConfigured ? "Continue with Google" : "Add Firebase config to enable Google sign-in"}
    >
      <Chrome className="h-4 w-4" />
      {loading ? "Connecting Google..." : "Continue with Google"}
    </Button>
  );
}
