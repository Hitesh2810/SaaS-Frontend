import { Card } from "@/components/ui/Card";

export default function AnalyticsCards({ kpis }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{kpis.map((item) => <Card key={item.label} interactive><p className="text-sm text-muted-foreground">{item.label}</p><p className="mt-3 text-2xl font-semibold">{item.value}</p><p className="mt-2 text-sm text-emerald-500">{item.trend}</p></Card>)}</div>;
}
