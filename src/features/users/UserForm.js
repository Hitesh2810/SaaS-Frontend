"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function UserForm({ initial, onSubmit, isPending }) {
  const [form, setForm] = useState(initial || { email: "", first_name: "", last_name: "", role: "ADMIN", is_active: true });
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })); }
  return (
    <form className="grid gap-3" onSubmit={(event) => { event.preventDefault(); onSubmit(form); }}>
      <Input required type="email" placeholder="Email" value={form.email} onChange={(event) => update("email", event.target.value)} />
      <Input placeholder="First name" value={form.first_name || ""} onChange={(event) => update("first_name", event.target.value)} />
      <Input placeholder="Last name" value={form.last_name || ""} onChange={(event) => update("last_name", event.target.value)} />
      <select className="h-10 rounded-md border bg-background/65 px-3 text-sm" value={form.role} onChange={(event) => update("role", event.target.value)}>
        <option value="SUPER_ADMIN">Super Admin</option><option value="ADMIN">Admin</option><option value="STAFF">Staff</option>
      </select>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(form.is_active)} onChange={(event) => update("is_active", event.target.checked)} /> Active</label>
      <Button disabled={isPending}>{isPending ? "Saving..." : "Save user"}</Button>
    </form>
  );
}
