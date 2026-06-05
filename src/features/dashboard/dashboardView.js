"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import DashboardStats from "./DashboardStats";
import { useDashboard } from "./dashboard";

export default function DashboardView() {
  const { data, isLoading, refetch } = useDashboard();
  return (
    <AppShell>
      <PageHeader eyebrow="Admin Overview" title="Dashboard" description="A high-signal control room for tenants, revenue, subscriptions, and platform health." action={<Button onClick={() => refetch()}>Refresh</Button>} />
      {isLoading ? <LoadingState label="Loading analytics" /> : (
        <>
          <DashboardStats data={data} />
          <DashboardCards />
          <DashboardCharts data={data} />
        </>
      )}
    </AppShell>
  );
}
