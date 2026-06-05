"use client";

import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function SubscriptionTable({ subscriptions }) {
  return (
    <Card className="mt-6 overflow-hidden p-0">
      <div className="border-b p-5"><h2 className="text-xl font-semibold">Subscription History</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr><th className="p-4">Plan</th><th className="p-4">Price</th><th className="p-4">Cycle</th><th className="p-4">Status</th><th className="p-4">Ends</th></tr>
          </thead>
          <tbody>
            {subscriptions.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-medium">{item.plan_name}</td>
                <td className="p-4">{formatCurrency(item.price)}</td>
                <td className="p-4">{item.billing_cycle}</td>
                <td className="p-4">{item.status}</td>
                <td className="p-4">{item.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
