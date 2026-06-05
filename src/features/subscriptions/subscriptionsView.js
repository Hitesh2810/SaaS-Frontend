"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import PricingCards from "./PricingCards";
import SubscriptionTable from "./SubscriptionTable";
import { useSubscriptionMutations, useSubscriptions } from "./subscriptions";

export default function SubscriptionsView() {
  const { data = [], isLoading } = useSubscriptions();
  const mutations = useSubscriptionMutations();
  return (
    <AppShell>
      <PageHeader eyebrow="Billing Plans" title="Subscriptions" description="Track active plans, renewals, billing cadence, and commercial packaging." />
      <PricingCards />
      <div className="mt-6">{isLoading ? <LoadingState label="Loading subscriptions" /> : <SubscriptionTable subscriptions={data} mutations={mutations} />}</div>
    </AppShell>
  );
}
