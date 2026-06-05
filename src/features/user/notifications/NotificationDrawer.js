"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotificationDrawer({ notification, onClose, onMarkRead }) {
  if (!notification) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
      <motion.aside initial={{ x: 420 }} animate={{ x: 0 }} className="glass ml-auto h-full w-full max-w-md p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{notification.created_at ? new Date(notification.created_at).toLocaleString() : ""}</p>
            <h2 className="mt-2 text-2xl font-semibold">{notification.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button>
        </div>
        <p className="mt-6 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{notification.message}</p>
        {!notification.is_read ? <Button className="mt-6" onClick={() => onMarkRead(notification.id)}>Mark as read</Button> : null}
      </motion.aside>
    </div>
  );
}
