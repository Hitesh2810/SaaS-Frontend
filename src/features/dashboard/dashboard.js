"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { formatCurrency, normalizeList } from "@/lib/utils";

export async function fetchDashboard() {
  const response = await api.get("/analytics/dashboard/");
  return transformDashboard(response.data);
}

export function transformDashboard(data = {}) {
  const revenueTrend = normalizeList(data.revenue_trend || data.revenue_by_month).map((item) => ({
    month: item.month || item.period || "Month",
    revenue: Number(item.revenue || item.total || item.amount || 0)
  }));
  const userGrowth = normalizeList(data.user_growth).map((item) => ({
    month: item.month || item.period || "Month",
    users: Number(item.users || item.count || 0)
  }));
  return {
    totalUsers: Number(data.total_users || 0),
    totalTenants: Number(data.total_tenants || 0),
    revenue: Number(data.monthly_revenue || data.revenue || 0),
    activeSubscriptions: Number(data.active_subscriptions || 0),
    notifications: Number(data.notifications || data.unread_notifications || 0),
    revenueLabel: formatCurrency(data.monthly_revenue || data.revenue || 0),
    revenueTrend: revenueTrend.length ? revenueTrend : seedRevenue,
    userGrowth: userGrowth.length ? userGrowth : seedGrowth,
    subscriptions: normalizeList(data.subscription_distribution).length ? normalizeList(data.subscription_distribution) : seedSubscriptions
  };
}

export function useDashboard() {
  return useQuery({ queryKey: ["dashboard"], queryFn: fetchDashboard });
}

const seedRevenue = [
  { month: "Jan", revenue: 18000 }, { month: "Feb", revenue: 24000 }, { month: "Mar", revenue: 31000 },
  { month: "Apr", revenue: 42000 }, { month: "May", revenue: 51000 }, { month: "Jun", revenue: 68000 }
];

const seedGrowth = [
  { month: "Jan", users: 420 }, { month: "Feb", users: 560 }, { month: "Mar", users: 720 },
  { month: "Apr", users: 940 }, { month: "May", users: 1220 }, { month: "Jun", users: 1540 }
];

const seedSubscriptions = [
  { name: "Starter", value: 28 }, { name: "Pro", value: 52 }, { name: "Enterprise", value: 20 }
];
