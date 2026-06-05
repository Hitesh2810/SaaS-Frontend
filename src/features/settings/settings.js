"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export async function fetchSettings() {
  const response = await api.get("/settings/");
  return normalizeList(response.data).reduce((acc, item) => {
    acc[item.category || "GENERAL"] = { ...(acc[item.category || "GENERAL"] || {}), [item.key]: item.value };
    return acc;
  }, {});
}

export function useSettings() {
  return useQuery({ queryKey: ["settings"], queryFn: fetchSettings });
}

export function useSettingsMutations() {
  const queryClient = useQueryClient();
  return {
    saveSetting: useMutation({
      mutationFn: (payload) => api.post("/settings/", payload),
      onSuccess: () => { toast.success("Settings saved"); queryClient.invalidateQueries({ queryKey: ["settings"] }); },
      onError: (error) => toast.error(apiErrorMessage(error))
    })
  };
}
