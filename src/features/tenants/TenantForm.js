"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function TenantForm({ initial, onSubmit, isPending }) {
  const [form, setForm] = useState(initial || { name: "", domain: "", contact_email: "", contact_phone: "", status: "ACTIVE" });
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  return (
    <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
      <Input required placeholder="Tenant name" value={form.name} onChange={(event) => update("name", event.target.value)} />
      <Input required placeholder="Domain" value={form.domain} onChange={(event) => update("domain", event.target.value)} />
      <Input type="email" placeholder="Contact email" value={form.contact_email} onChange={(event) => update("contact_email", event.target.value)} />
      <Input placeholder="Contact phone" value={form.contact_phone} onChange={(event) => update("contact_phone", event.target.value)} />
      <select className="h-10 rounded-md border bg-background/65 px-3 text-sm" value={form.status} onChange={(event) => update("status", event.target.value)}>
        <option value="ACTIVE">Active</option><option value="SUSPENDED">Suspended</option><option value="TRIAL">Trial</option>
      </select>
      <Button disabled={isPending}>{isPending ? "Saving..." : "Save tenant"}</Button>
    </form>
  );
}
