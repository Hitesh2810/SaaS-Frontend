"use client";

import { motion } from "framer-motion";
import { Bell, Calendar, CreditCard, Shield, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function DashboardStats({ stats }) {
  const items = [
    { label: "Active Plan", value: stats.activePlan, icon: Shield },
    { label: "Total Payments", value: formatCurrency(stats.totalPayments), icon: Wallet },
    { label: "Last Payment", value: stats.lastPayment ? formatCurrency(stats.lastPayment.amount) : "$0", icon: CreditCard },
    { label: "Unread", value: stats.unreadNotifications, icon: Bell },
    { label: "Member Since", value: stats.memberSince ? new Date(stats.memberSince).toLocaleDateString() : "Today", icon: Calendar }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card interactive className="min-h-32">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-5 text-2xl font-semibold">{item.value}</p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
