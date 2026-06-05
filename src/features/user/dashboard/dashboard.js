"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export const USER_PLANS = [
  { name: "Basic", price: 19, cycle: "MONTHLY", features: ["Core dashboard", "Email notifications", "Payment history"] },
  { name: "Pro", price: 59, cycle: "MONTHLY", features: ["Everything in Basic", "Advanced analytics", "Priority notifications"] },
  { name: "Enterprise", price: 199, cycle: "MONTHLY", features: ["Dedicated workspace", "Custom billing", "Premium support"] }
];

export function useUserSubscriptions() {
  return useQuery({
    queryKey: ["subscriptions", "user"],
    queryFn: async () => normalizeList((await api.get("/subscriptions/")).data)
  });
}

export function useUserPayments() {
  return useQuery({
    queryKey: ["payments", "user"],
    queryFn: async () => normalizeList((await api.get("/payments/")).data)
  });
}

export function useUserNotifications() {
  return useQuery({
    queryKey: ["notifications", "user"],
    queryFn: async () => normalizeList((await api.get("/notifications/")).data),
    refetchInterval: 15000
  });
}

export function getActiveSubscription(subscriptions) {
  return subscriptions.find((item) => item.status === "ACTIVE") || subscriptions[0] || null;
}

export function buildDashboardStats({ subscriptions = [], payments = [], notifications = [], user }) {
  const active = getActiveSubscription(subscriptions);
  const paid = payments.filter((payment) => payment.status === "PAID");
  const lastPayment = paid[0] || payments[0] || null;
  return {
    activePlan: active?.plan_name || "No active plan",
    totalPayments: paid.reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
    lastPayment,
    unreadNotifications: notifications.filter((item) => !item.is_read).length,
    memberSince: user?.created_at
  };
}
