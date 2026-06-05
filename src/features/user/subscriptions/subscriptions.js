"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { USER_PLANS } from "@/features/user/dashboard/dashboard";

export function makeTransactionId() {
  const year = new Date().getFullYear();
  const suffix = Math.floor(10000 + Math.random() * 89999);
  return `TXN-${year}-${suffix}`;
}

export function datesForCycle(cycle) {
  const start = new Date();
  const end = new Date(start);
  end.setMonth(end.getMonth() + (cycle === "YEARLY" ? 12 : 1));
  return {
    start_date: start.toISOString().slice(0, 10),
    end_date: end.toISOString().slice(0, 10)
  };
}

export function validateCard(card) {
  const digits = card.cardNumber.replace(/\s/g, "");
  if (!/^\d{16}$/.test(digits)) return "Card number must be 16 digits.";
  if (!card.cardHolder.trim()) return "Card holder is required.";
  if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return "Expiry must use MM/YY.";
  if (!/^\d{3,4}$/.test(card.cvv)) return "CVV must be 3 or 4 digits.";
  const [month, year] = card.expiry.split("/").map(Number);
  if (month < 1 || month > 12) return "Expiry month is invalid.";
  const expires = new Date(2000 + year, month);
  if (expires < new Date()) return "Card is expired.";
  return "";
}

export function useSubscribeMutation(user) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ plan, card }) => {
      const validation = validateCard(card);
      if (validation) throw new Error(validation);
      const dates = datesForCycle(plan.cycle);
      const subscription = await api.post("/subscriptions/", {
        tenant: user?.tenant,
        plan_name: plan.name,
        price: plan.price,
        billing_cycle: plan.cycle,
        status: "ACTIVE",
        ...dates
      });
      const transactionId = makeTransactionId();
      const payment = await api.post("/payments/", {
        subscription: subscription.data.id,
        amount: plan.price,
        payment_method: "DUMMY_CARD",
        transaction_id: transactionId,
        status: "PAID",
        payment_date: new Date().toISOString()
      });
      return { subscription: subscription.data, payment: payment.data, transactionId };
    },
    onSuccess: () => {
      toast.success("Subscription activated");
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
    onError: (error) => toast.error(apiErrorMessage(error) || error.message)
  });
}

export { USER_PLANS };
