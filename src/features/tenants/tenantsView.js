"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import TenantTable from "./TenantTable";
import { useTenantMutations, useTenants } from "./tenants";

export default function TenantsView() {
  const { data = [], isLoading } = useTenants();
  const mutations = useTenantMutations();
  return (
    <AppShell>
      <PageHeader eyebrow="Workspace Directory" title="Tenants" description="Create, inspect, filter, and govern every tenant in the platform." />
      {isLoading ? <LoadingState label="Loading tenants" /> : <TenantTable tenants={data} mutations={mutations} />}
    </AppShell>
  );
}
