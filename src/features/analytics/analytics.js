"use client";

import { useMemo, useState } from "react";
import { useDashboard } from "@/features/dashboard/dashboard";

export function useAnalytics() {
  const [range, setRange] = useState("6m");
  const dashboard = useDashboard();
  const data = useMemo(() => {
    const source = dashboard.data || {};
    return {
      range,
      revenueTrend: source.revenueTrend || [],
      userGrowth: source.userGrowth || [],
      subscriptions: source.subscriptions || [],
      kpis: [
        { label: "Net revenue", value: source.revenueLabel || "$0", trend: "+18.4%" },
        { label: "Activation rate", value: "68%", trend: "+6.2%" },
        { label: "Churn risk", value: "3.8%", trend: "-1.1%" },
        { label: "Expansion MRR", value: "$12.4K", trend: "+9.7%" }
      ]
    };
  }, [dashboard.data, range]);
  return { ...dashboard, data, range, setRange };
}

export function exportAnalytics(data) {
  const csv = ["metric,value", ...data.kpis.map((item) => `${item.label},${item.value}`)].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "analytics-export.csv";
  link.click();
  URL.revokeObjectURL(url);
}
