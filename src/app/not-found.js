import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass max-w-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This admin surface does not exist.</p>
        <Button asChild className="mt-6"><Link href="/dashboard">Return to dashboard</Link></Button>
      </div>
    </main>
  );
}
