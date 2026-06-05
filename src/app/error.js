"use client";

import { Button } from "@/components/ui/Button";

export default function Error({ reset }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass max-w-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold">Something slipped.</h1>
        <p className="mt-3 text-sm text-muted-foreground">The dashboard could not render this view.</p>
        <Button className="mt-6" onClick={reset}>Retry</Button>
      </div>
    </main>
  );
}
