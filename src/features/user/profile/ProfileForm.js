"use client";

import { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useUserAuth } from "@/contexts/UserAuthContext";
import { initials } from "./profile";

export default function ProfileForm() {
  const { user, updateProfile, changePassword } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [form, setForm] = useState({ username: "", first_name: "", last_name: "", email: "" });
  const [passwords, setPasswords] = useState({ old_password: "", new_password: "" });

  useEffect(() => {
    if (user) setForm({ username: user.username || "", first_name: user.first_name || "", last_name: user.last_name || "", email: user.email || "" });
  }, [user]);

  async function saveProfile(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
    } finally {
      setLoading(false);
    }
  }

  async function savePassword(event) {
    event.preventDefault();
    setPasswordLoading(true);
    try {
      await changePassword(passwords);
      setPasswords({ old_password: "", new_password: "" });
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <Card className="p-6">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-foreground text-3xl font-semibold text-background">{initials(user)}</div>
        <Button className="mt-5 w-full" variant="outline" type="button"><Camera className="h-4 w-4" /> Change avatar</Button>
        <div className="mt-6 grid gap-3 text-sm">
          <div className="rounded-lg bg-secondary p-3"><span className="text-muted-foreground">Tenant</span><p className="font-medium">{user?.tenant_name || user?.tenant || "Workspace"}</p></div>
          <div className="rounded-lg bg-secondary p-3"><span className="text-muted-foreground">Role</span><p className="font-medium">{user?.role || "USER"}</p></div>
          <div className="rounded-lg bg-secondary p-3"><span className="text-muted-foreground">Account</span><p className="font-medium">{user?.is_active ? "Active" : "Inactive"}</p></div>
        </div>
      </Card>
      <div className="grid gap-5">
        <Card className="p-6">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <form className="mt-5 grid gap-4" onSubmit={saveProfile}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="First name" value={form.first_name} onChange={(event) => setForm((current) => ({ ...current, first_name: event.target.value }))} />
              <Input placeholder="Last name" value={form.last_name} onChange={(event) => setForm((current) => ({ ...current, last_name: event.target.value }))} />
            </div>
            <Input placeholder="Username" value={form.username} onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))} />
            <Input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
            <Button className="w-fit" disabled={loading}><Save className="h-4 w-4" /> {loading ? "Saving..." : "Save profile"}</Button>
          </form>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Change password</h2>
          <form className="mt-5 grid gap-4" onSubmit={savePassword}>
            <Input type="password" placeholder="Current password" value={passwords.old_password} onChange={(event) => setPasswords((current) => ({ ...current, old_password: event.target.value }))} />
            <Input type="password" placeholder="New password" value={passwords.new_password} onChange={(event) => setPasswords((current) => ({ ...current, new_password: event.target.value }))} />
            <Button className="w-fit" disabled={passwordLoading}>{passwordLoading ? "Updating..." : "Update password"}</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
