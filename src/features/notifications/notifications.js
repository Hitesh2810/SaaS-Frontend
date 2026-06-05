"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export async function fetchNotifications() {
  const response = await api.get("/notifications/");
  return normalizeList(response.data).map(transformNotification);
}

export function transformNotification(item) {
  return {
    id: item.id,
    title: item.title || "Notification",
    message: item.message || "",
    read: Boolean(item.is_read || item.read),
    recipient: item.recipient,
    created_at: item.created_at
  };
}

export function useNotifications() {
  return useQuery({ queryKey: ["notifications"], queryFn: fetchNotifications, refetchInterval: 15000 });
}

export function useNotificationMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });
  return {
    createNotification: useMutation({
      mutationFn: (payload) => api.post("/notifications/", payload),
      onSuccess: () => { toast.success("Notification sent"); invalidate(); },
      onError: (error) => toast.error(apiErrorMessage(error))
    }),
    markAsRead: useMutation({
      mutationFn: (id) => api.post(`/notifications/${id}/mark-as-read/`),
      onSuccess: () => invalidate(),
      onError: (error) => toast.error(apiErrorMessage(error))
    })
  };
}
