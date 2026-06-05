"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import DataTable from "@/components/DataTable";
import TenantModal from "./TenantModal";

export default function TenantTable({ tenants, mutations }) {
  const columns = [
    { accessorKey: "name", header: "Tenant" },
    { accessorKey: "domain", header: "Domain" },
    { accessorKey: "contact_email", header: "Contact" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "ACTIVE" ? "green" : "amber"}>{row.original.status}</Badge> },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <TenantModal tenant={row.original} onSubmit={(payload) => mutations.updateTenant.mutate({ id: row.original.id, payload })} isPending={mutations.updateTenant.isPending} trigger={<Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>} />
          <Button size="icon" variant="ghost" onClick={() => window.confirm("Delete this tenant?") && mutations.deleteTenant.mutate(row.original.id)}><Trash2 className="h-4 w-4" /></Button>
        </div>
      )
    }
  ];
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <TenantModal onSubmit={(payload) => mutations.createTenant.mutate(payload)} isPending={mutations.createTenant.isPending} trigger={<Button><Plus className="h-4 w-4" /> Add Tenant</Button>} />
      </div>
      <DataTable data={tenants} columns={columns} searchPlaceholder="Search tenants..." />
    </div>
  );
}
