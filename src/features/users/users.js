"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export async function fetchUsers() {
  const response = await api.get("/users/");
  return normalizeList(response.data).map(transformUser);
}

export function transformUser(user) {
  const name = user.name || [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email || "User";
  return {
    id: user.id,
    name,
    email: user.email,
    role: user.role || "ADMIN",
    status: user.is_active === false ? "INACTIVE" : user.status || "ACTIVE",
    tenant: user.tenant_name || user.tenant || "-",
    avatar: user.avatar,
    joined: user.date_joined || user.created_at
  };
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: fetchUsers });
}

export function useUserMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["users"] });
  const options = (message) => ({
    onSuccess: () => { toast.success(message); invalidate(); },
    onError: (error) => toast.error(apiErrorMessage(error))
  });
  return {
    createUser: useMutation({ mutationFn: (payload) => api.post("/users/", payload), ...options("User created") }),
    updateUser: useMutation({ mutationFn: ({ id, payload }) => api.put(`/users/${id}/`, payload), ...options("User updated") }),
    deleteUser: useMutation({ mutationFn: (id) => api.delete(`/users/${id}/`), ...options("User deleted") })
  };
}
