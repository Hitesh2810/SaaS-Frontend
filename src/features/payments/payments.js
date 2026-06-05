"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export async function fetchPayments() {
  const response = await api.get("/payments/");
  return normalizeList(response.data).map(transformPayment);
}

export function transformPayment(payment) {
  return {
    id: payment.id,
    subscription: payment.subscription,
    amount: Number(payment.amount || 0),
    payment_method: payment.payment_method || "CARD",
    transaction_id: payment.transaction_id || "-",
    status: payment.status || "PAID",
    payment_date: payment.payment_date || payment.created_at
  };
}

export function summarizePayments(payments) {
  const paid = payments.filter((payment) => payment.status === "PAID");
  return {
    revenue: paid.reduce((sum, payment) => sum + payment.amount, 0),
    paid: paid.length,
    pending: payments.filter((payment) => payment.status === "PENDING").length,
    failed: payments.filter((payment) => payment.status === "FAILED").length
  };
}

export function usePayments() {
  return useQuery({ queryKey: ["payments"], queryFn: fetchPayments });
}

export function usePaymentMutations() {
  const queryClient = useQueryClient();
  return {
    createPayment: useMutation({
      mutationFn: (payload) => api.post("/payments/", payload),
      onSuccess: () => { toast.success("Payment created"); queryClient.invalidateQueries({ queryKey: ["payments"] }); },
      onError: (error) => toast.error(apiErrorMessage(error))
    })
  };
}
