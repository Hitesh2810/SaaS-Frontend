"use client";

import { Bell } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function NotificationList({ notifications, onOpen, onMarkRead }) {
  return (
    <div className="grid gap-3">
      {notifications.map((item) => (
        <Card key={item.id} className="p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <button className="flex min-w-0 flex-1 items-start gap-3 text-left" onClick={() => onOpen(item)}>
              <span className={item.is_read ? "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground" : "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent"}><Bell className="h-4 w-4" /></span>
              <span className="min-w-0">
                <span className="block truncate font-medium">{item.title}</span>
                <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{item.message}</span>
              </span>
            </button>
            {!item.is_read ? <Button variant="outline" size="sm" onClick={() => onMarkRead(item.id)}>Mark read</Button> : null}
          </div>
        </Card>
      ))}
      {!notifications.length ? <Card className="p-8 text-center text-muted-foreground">No notifications match your filters.</Card> : null}
    </div>
  );
}
