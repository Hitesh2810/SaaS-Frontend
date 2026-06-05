"use client";

import { Download } from "lucide-react";
import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import AnalyticsCards from "./AnalyticsCards";
import AnalyticsCharts from "./AnalyticsCharts";
import { exportAnalytics, useAnalytics } from "./analytics";

export default function AnalyticsView() {
  const { data, isLoading, range, setRange } = useAnalytics();
  return (
    <AppShell>
      <PageHeader eyebrow="Decision Intelligence" title="Analytics" description="Interactive filters, KPI trend analysis, and export-ready business intelligence." action={<Button onClick={() => exportAnalytics(data)}><Download className="h-4 w-4" /> Export</Button>} />
      <div className="mb-5 flex gap-2">{["30d", "6m", "12m"].map((item) => <Button key={item} variant={range === item ? "default" : "outline"} size="sm" onClick={() => setRange(item)}>{item}</Button>)}</div>
      {isLoading ? <LoadingState label="Loading analytics" /> : <><AnalyticsCards kpis={data.kpis} /><AnalyticsCharts data={data} /></>}
    </AppShell>
  );
}
