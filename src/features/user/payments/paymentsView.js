"use client";

import UserPortalShell from "@/features/user/dashboard/UserPortalShell";
import PaymentCard from "./PaymentCard";
import PaymentHistory from "./PaymentHistory";
import { usePaymentSummary } from "./payments";

export default function UserPaymentsView() {
  const { data = [], paid, total } = usePaymentSummary();
  return (
    <UserPortalShell>
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Payments</h1>
        <p className="mt-2 text-sm text-muted-foreground">Review transactions generated from your subscription activity.</p>
      </div>
      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <PaymentCard label="Total Paid" value={total} />
        <PaymentCard label="Paid Transactions" value={String(paid)} />
        <PaymentCard label="Latest Status" value={data[0]?.status || "None"} />
      </div>
      <PaymentHistory payments={data} />
    </UserPortalShell>
  );
}
