import { CreditCard, Timer, TrendingUp, XCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function RevenueCards({ summary }) {
  const items = [
    { label: "Collected Revenue", value: formatCurrency(summary.revenue), icon: TrendingUp },
    { label: "Paid Invoices", value: summary.paid, icon: CreditCard },
    { label: "Pending", value: summary.pending, icon: Timer },
    { label: "Failed", value: summary.failed, icon: XCircle }
  ];
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map((item) => { const Icon = item.icon; return <Card key={item.label} interactive><Icon className="h-5 w-5 text-accent" /><p className="mt-4 text-sm text-muted-foreground">{item.label}</p><p className="mt-2 text-2xl font-semibold">{item.value}</p></Card>; })}</div>;
}
