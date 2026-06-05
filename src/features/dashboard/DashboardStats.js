"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bell, Building2, CreditCard, ShieldCheck, Users } from "lucide-react";
import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { formatNumber } from "@/lib/utils";

function AnimatedValue({ value, prefix = "" }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1200 });
  const rounded = useTransform(spring, (latest) => `${prefix}${formatNumber(Math.round(latest))}`);
  useEffect(() => { motionValue.set(Number(value || 0)); }, [motionValue, value]);
  return <motion.span>{rounded}</motion.span>;
}

export default function DashboardStats({ data }) {
  const cards = [
    { label: "Total Users", value: data.totalUsers, icon: Users, tone: "text-sky-400" },
    { label: "Total Tenants", value: data.totalTenants, icon: Building2, tone: "text-teal-400" },
    { label: "Revenue", value: data.revenue, prefix: "$", icon: CreditCard, tone: "text-emerald-400" },
    { label: "Active Subscriptions", value: data.activeSubscriptions, icon: ShieldCheck, tone: "text-violet-400" },
    { label: "Notifications", value: data.notifications, icon: Bell, tone: "text-rose-400" }
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={card.label} interactive className="relative overflow-hidden">
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent/10 blur-2xl" />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <Icon className={`h-5 w-5 ${card.tone}`} />
            </div>
            <p className="mt-4 text-2xl font-semibold"><AnimatedValue value={card.value} prefix={card.prefix || ""} /></p>
            <p className="mt-2 text-xs text-muted-foreground">+{index + 7}.4% from last period</p>
          </Card>
        );
      })}
    </div>
  );
}
