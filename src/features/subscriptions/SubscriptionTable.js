"use client";

import { RotateCw } from "lucide-react";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import RenewalModal from "./RenewalModal";

export default function SubscriptionTable({ subscriptions, mutations }) {
  const columns = [
    { accessorKey: "tenant", header: "Tenant" },
    { accessorKey: "plan_name", header: "Plan" },
    { accessorKey: "price", header: "Price", cell: ({ row }) => formatCurrency(row.original.price) },
    { accessorKey: "billing_cycle", header: "Cycle" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "ACTIVE" ? "green" : "amber"}>{row.original.status}</Badge> },
    { id: "actions", header: "Actions", cell: ({ row }) => <RenewalModal subscription={row.original} onRenew={(payload) => mutations.renewSubscription.mutate({ id: row.original.id, payload })} isPending={mutations.renewSubscription.isPending} trigger={<Button size="sm" variant="outline"><RotateCw className="h-4 w-4" /> Renew</Button>} /> }
  ];
  return <DataTable data={subscriptions} columns={columns} searchPlaceholder="Search subscriptions..." />;
}
