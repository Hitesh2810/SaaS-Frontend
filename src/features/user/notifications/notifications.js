"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { useUserNotifications } from "@/features/user/dashboard/dashboard";

export function useUserNotificationMutations() {
  const queryClient = useQueryClient();
  return {
    markAsRead: useMutation({
      mutationFn: (id) => api.post(`/notifications/${id}/mark-as-read/`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
      onError: (error) => toast.error(apiErrorMessage(error))
    })
  };
}

export function useNotificationInbox() {
  return useUserNotifications();
}
