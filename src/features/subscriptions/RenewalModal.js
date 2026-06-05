"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";

export default function RenewalModal({ subscription, onRenew, isPending, trigger }) {
  const [payload, setPayload] = useState({ end_date: subscription.end_date || "", price: subscription.price || "" });
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Renew subscription</DialogTitle><DialogDescription>Extend the billing period and confirm price.</DialogDescription></DialogHeader>
        <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); onRenew(payload); }}>
          <Input type="date" value={payload.end_date} onChange={(event) => setPayload((current) => ({ ...current, end_date: event.target.value }))} />
          <Input value={payload.price} onChange={(event) => setPayload((current) => ({ ...current, price: event.target.value }))} />
          <Button disabled={isPending}>{isPending ? "Renewing..." : "Renew"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
