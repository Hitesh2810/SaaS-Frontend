"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";

export default function NotificationDrawer({ mutations }) {
  const [form, setForm] = useState({ title: "", message: "", recipient: "" });
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  return (
    <Dialog>
      <DialogTrigger asChild><Button><Plus className="h-4 w-4" /> Send Notification</Button></DialogTrigger>
      <DialogContent className="right-4 left-auto top-4 h-[calc(100vh-2rem)] max-w-md translate-x-0 translate-y-0">
        <DialogHeader><DialogTitle>Notification center</DialogTitle><DialogDescription>Send a user-facing platform notification.</DialogDescription></DialogHeader>
        <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); mutations.createNotification.mutate(form); }}>
          <Input placeholder="Recipient user ID" value={form.recipient} onChange={(event) => update("recipient", event.target.value)} />
          <Input placeholder="Title" value={form.title} onChange={(event) => update("title", event.target.value)} />
          <textarea className="min-h-32 rounded-md border bg-background/65 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="Message" value={form.message} onChange={(event) => update("message", event.target.value)} />
          <Button disabled={mutations.createNotification.isPending}>{mutations.createNotification.isPending ? "Sending..." : "Send"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
