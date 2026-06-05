"use client";

import { Plus } from "lucide-react";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import PaymentModal from "./PaymentModal";

export default function PaymentTable({ payments, mutations }) {
  const columns = [
    { accessorKey: "transaction_id", header: "Transaction" },
    { accessorKey: "subscription", header: "Subscription" },
    { accessorKey: "amount", header: "Amount", cell: ({ row }) => formatCurrency(row.original.amount) },
    { accessorKey: "payment_method", header: "Method" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "PAID" ? "green" : row.original.status === "FAILED" ? "red" : "amber"}>{row.original.status}</Badge> },
    { accessorKey: "payment_date", header: "Date", cell: ({ row }) => row.original.payment_date ? new Date(row.original.payment_date).toLocaleDateString() : "-" }
  ];
  return (
    <div>
      <div className="mb-4 flex justify-end"><PaymentModal onSubmit={(payload) => mutations.createPayment.mutate(payload)} isPending={mutations.createPayment.isPending} trigger={<Button><Plus className="h-4 w-4" /> Add Payment</Button>} /></div>
      <DataTable data={payments} columns={columns} searchPlaceholder="Search payments..." />
    </div>
  );
}
