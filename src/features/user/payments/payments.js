"use client";

import { useUserPayments } from "@/features/user/dashboard/dashboard";

export function usePaymentSummary() {
  const query = useUserPayments();
  const payments = query.data || [];
  return {
    ...query,
    paid: payments.filter((item) => item.status === "PAID").length,
    total: payments.reduce((sum, item) => item.status === "PAID" ? sum + Number(item.amount || 0) : sum, 0)
  };
}
