"use client";

import { Activity, ArrowUpRight, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DashboardCards() {
  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-3">
      <Card interactive className="lg:col-span-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Operational Command Center</p>
            <h2 className="mt-2 text-2xl font-semibold">Tenant health is trending upward</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Usage, retention, and payment reliability are aligned for expansion-ready accounts.</p>
          </div>
          <Activity className="h-6 w-6 text-accent" />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["99.98% uptime", "42 renewals", "8 expansion signals"].map((item) => <div key={item} className="rounded-md bg-secondary/70 p-3 text-sm">{item}</div>)}
        </div>
      </Card>
      <Card interactive>
        <Zap className="h-6 w-6 text-amber-400" />
        <h3 className="mt-4 font-semibold">Automation Queue</h3>
        <p className="mt-2 text-sm text-muted-foreground">12 lifecycle messages and 4 invoice retries are ready for review.</p>
        <Button className="mt-5 w-full">Review <ArrowUpRight className="h-4 w-4" /></Button>
      </Card>
    </div>
  );
}
