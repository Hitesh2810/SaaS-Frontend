"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";

export default function PaymentModal({ onSubmit, isPending, trigger }) {
  const [form, setForm] = useState({ subscription: "", amount: "", payment_method: "CARD", transaction_id: "", status: "PAID", payment_date: new Date().toISOString() });
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add payment</DialogTitle><DialogDescription>Record a transaction against a subscription.</DialogDescription></DialogHeader>
        <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
          <Input placeholder="Subscription ID" value={form.subscription} onChange={(event) => update("subscription", event.target.value)} />
          <Input placeholder="Amount" value={form.amount} onChange={(event) => update("amount", event.target.value)} />
          <Input placeholder="Transaction ID" value={form.transaction_id} onChange={(event) => update("transaction_id", event.target.value)} />
          <select className="h-10 rounded-md border bg-background/65 px-3 text-sm" value={form.status} onChange={(event) => update("status", event.target.value)}><option>PAID</option><option>PENDING</option><option>FAILED</option></select>
          <Button disabled={isPending}>{isPending ? "Saving..." : "Save payment"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
