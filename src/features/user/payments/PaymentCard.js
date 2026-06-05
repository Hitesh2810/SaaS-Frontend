"use client";

import { CreditCard } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function PaymentCard({ label, value }) {
  return (
    <Card interactive className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <CreditCard className="h-5 w-5 text-accent" />
      </div>
      <p className="mt-4 text-3xl font-semibold">{typeof value === "number" ? formatCurrency(value) : value}</p>
    </Card>
  );
}
