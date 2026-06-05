"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api, { apiErrorMessage } from "@/lib/api";
import { normalizeList } from "@/lib/utils";

export async function fetchTenants() {
  const response = await api.get("/tenants/");
  return normalizeList(response.data).map(transformTenant);
}

export function transformTenant(tenant) {
  return {
    id: tenant.id,
    name: tenant.name || "Untitled tenant",
    domain: tenant.domain || "-",
    contact_email: tenant.contact_email || tenant.email || "-",
    contact_phone: tenant.contact_phone || "-",
    status: tenant.status || "ACTIVE",
    created_at: tenant.created_at
  };
}

export function useTenants() {
  return useQuery({ queryKey: ["tenants"], queryFn: fetchTenants });
}

export function useTenantMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["tenants"] });
  const options = (message) => ({
    onSuccess: () => { toast.success(message); invalidate(); },
    onError: (error) => toast.error(apiErrorMessage(error))
  });
  return {
    createTenant: useMutation({ mutationFn: (payload) => api.post("/tenants/", payload), ...options("Tenant created") }),
    updateTenant: useMutation({ mutationFn: ({ id, payload }) => api.put(`/tenants/${id}/`, payload), ...options("Tenant updated") }),
    deleteTenant: useMutation({ mutationFn: (id) => api.delete(`/tenants/${id}/`), ...options("Tenant deleted") })
  };
}
