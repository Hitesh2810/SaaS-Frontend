"use client";

import Link from "next/link";
import { Bell, CreditCard, User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DashboardCards({ user, subscription, payments, notifications }) {
  const unread = notifications.filter((item) => !item.is_read).slice(0, 3);
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome card</p>
            <h1 className="mt-2 text-3xl font-semibold">Hi, {user?.first_name || user?.username || "there"}</h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Your account is active and synchronized with the admin dashboard through the backend APIs.</p>
          </div>
          <Button asChild><Link href="/user/profile"><User className="h-4 w-4" /> Edit profile</Link></Button>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-secondary p-4"><p className="text-xs text-muted-foreground">Account Status</p><p className="mt-2 font-semibold">{user?.is_active ? "Active" : "Inactive"}</p></div>
          <div className="rounded-lg bg-secondary p-4"><p className="text-xs text-muted-foreground">Current Plan</p><p className="mt-2 font-semibold">{subscription?.plan_name || "None"}</p></div>
          <div className="rounded-lg bg-secondary p-4"><p className="text-xs text-muted-foreground">Payments</p><p className="mt-2 font-semibold">{payments.length} records</p></div>
        </div>
      </Card>
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Notifications</h2>
          <Button asChild variant="ghost" size="sm"><Link href="/user/notifications"><Bell className="h-4 w-4" /> View</Link></Button>
        </div>
        <div className="grid gap-3">
          {unread.length ? unread.map((item) => (
            <div key={item.id} className="rounded-lg border bg-background/40 p-3">
              <p className="text-sm font-medium">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.message}</p>
            </div>
          )) : <p className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground">No unread notifications.</p>}
        </div>
        <Button asChild className="mt-5 w-full" variant="outline"><Link href="/user/payments"><CreditCard className="h-4 w-4" /> Payment history</Link></Button>
      </Card>
    </div>
  );
}
