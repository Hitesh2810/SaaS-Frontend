"use client";

import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function SecuritySettings() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-accent" /><h2 className="text-xl font-semibold">Security Settings</h2></div>
      <div className="mt-5 grid gap-3 text-sm">
        <label className="flex items-center justify-between rounded-lg bg-secondary p-3">Two-factor authentication <input type="checkbox" className="h-4 w-4 accent-slate-950" /></label>
        <label className="flex items-center justify-between rounded-lg bg-secondary p-3">Login alerts <input type="checkbox" defaultChecked className="h-4 w-4 accent-slate-950" /></label>
      </div>
    </Card>
  );
}
