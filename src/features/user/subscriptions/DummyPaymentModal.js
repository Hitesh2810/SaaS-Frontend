"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";

export default function DummyPaymentModal({ plan, open, onClose, onPay, loading, result }) {
  const [card, setCard] = useState({ cardNumber: "", cardHolder: "", expiry: "", cvv: "" });
  const [error, setError] = useState("");
  if (!open || !plan) return null;

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await onPay(card);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="glass w-full max-w-lg rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{result ? "Payment complete" : "Dummy payment"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{plan.name} plan, {formatCurrency(plan.price)}</p>
          </div>
          <button onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        {result ? (
          <div className="py-8 text-center">
            <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
              <CheckCircle className="h-9 w-9" />
            </motion.div>
            <p className="mt-5 text-lg font-semibold">Success</p>
            <p className="mt-2 text-sm text-muted-foreground">Transaction {result.transactionId} has been saved.</p>
            <Button className="mt-6" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={submit}>
            <label className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="4242 4242 4242 4242" value={card.cardNumber} onChange={(event) => setCard((current) => ({ ...current, cardNumber: event.target.value }))} />
            </label>
            <Input placeholder="Card holder" value={card.cardHolder} onChange={(event) => setCard((current) => ({ ...current, cardHolder: event.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="MM/YY" value={card.expiry} onChange={(event) => setCard((current) => ({ ...current, expiry: event.target.value }))} />
              <Input placeholder="CVV" value={card.cvv} onChange={(event) => setCard((current) => ({ ...current, cvv: event.target.value }))} />
            </div>
            {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
            <Button className="h-11" disabled={loading}>{loading ? "Processing..." : "Pay and activate"}</Button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
