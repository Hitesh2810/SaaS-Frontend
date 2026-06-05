"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import PaymentTable from "./PaymentTable";
import RevenueCards from "./RevenueCards";
import { summarizePayments, usePaymentMutations, usePayments } from "./payments";

export default function PaymentsView() {
  const { data = [], isLoading } = usePayments();
  const mutations = usePaymentMutations();
  return (
    <AppShell>
      <PageHeader eyebrow="Revenue Operations" title="Payments" description="Monitor payment status, revenue quality, and transaction history." />
      <RevenueCards summary={summarizePayments(data)} />
      <div className="mt-6">{isLoading ? <LoadingState label="Loading payments" /> : <PaymentTable payments={data} mutations={mutations} />}</div>
    </AppShell>
  );
}
