"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export async function fetchSubscriptions() {
  const response = await api.get("/subscriptions/");
  return normalizeList(response.data).map(transformSubscription);
}

export function transformSubscription(item) {
  return {
    id: item.id,
    tenant: item.tenant_name || item.tenant || "-",
    plan_name: item.plan_name || item.plan || "Pro",
    price: Number(item.price || 0),
    billing_cycle: item.billing_cycle || "MONTHLY",
    status: item.status || "ACTIVE",
    start_date: item.start_date,
    end_date: item.end_date
  };
}

export function useSubscriptions() {
  return useQuery({ queryKey: ["subscriptions"], queryFn: fetchSubscriptions });
}

export function useSubscriptionMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
  return {
    createSubscription: useMutation({
      mutationFn: (payload) => api.post("/subscriptions/", payload),
      onSuccess: () => { toast.success("Subscription created"); invalidate(); },
      onError: (error) => toast.error(apiErrorMessage(error))
    }),
    renewSubscription: useMutation({
      mutationFn: ({ id, payload }) => api.post(`/subscriptions/${id}/renew/`, payload),
      onSuccess: () => { toast.success("Subscription renewed"); invalidate(); },
      onError: (error) => toast.error(apiErrorMessage(error))
    })
  };
}
