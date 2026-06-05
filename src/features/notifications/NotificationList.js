"use client";

import { CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/EmptyState";

export default function NotificationList({ notifications, mutations }) {
  if (!notifications.length) return <EmptyState title="No notifications" description="Outbound and system messages will appear here." />;
  return (
    <div className="grid gap-3">
      {notifications.map((item) => (
        <Card key={item.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-accent/10 text-accent"><Send className="h-4 w-4" /></div>
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.message}</p>
            </div>
          </div>
          <Button size="sm" variant={item.read ? "secondary" : "outline"} onClick={() => mutations.markAsRead.mutate(item.id)} disabled={item.read}><CheckCircle className="h-4 w-4" /> {item.read ? "Read" : "Mark read"}</Button>
        </Card>
      ))}
    </div>
  );
}
