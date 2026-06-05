"use client";

import { Badge } from "@/components/ui/Badge";

export default function SecuritySettings() {
  return <div className="space-y-3 text-sm"><p className="flex items-center justify-between rounded-md bg-secondary/70 p-3">JWT refresh rotation <Badge tone="green">Enabled</Badge></p><p className="flex items-center justify-between rounded-md bg-secondary/70 p-3">Session auto logout <Badge tone="green">Enabled</Badge></p></div>;
}
