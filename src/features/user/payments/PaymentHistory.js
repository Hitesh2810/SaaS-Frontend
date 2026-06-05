"use client";

import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function PaymentHistory({ payments }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b p-5"><h2 className="text-xl font-semibold">Payment History</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr><th className="p-4">Transaction ID</th><th className="p-4">Amount</th><th className="p-4">Method</th><th className="p-4">Status</th><th className="p-4">Date</th></tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="p-4 font-medium">{payment.transaction_id}</td>
                <td className="p-4">{formatCurrency(payment.amount)}</td>
                <td className="p-4">{payment.payment_method}</td>
                <td className="p-4"><span className="rounded-full bg-accent/15 px-2 py-1 text-xs font-medium text-accent">{payment.status}</span></td>
                <td className="p-4">{payment.payment_date ? new Date(payment.payment_date).toLocaleString() : "-"}</td>
              </tr>
            ))}
            {!payments.length ? <tr><td className="p-8 text-center text-muted-foreground" colSpan="5">No payments yet.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
