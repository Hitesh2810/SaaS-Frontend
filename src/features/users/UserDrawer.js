"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Badge } from "@/components/ui/Badge";

export default function UserDrawer({ user, trigger }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="right-4 left-auto top-4 h-[calc(100vh-2rem)] max-w-md translate-x-0 translate-y-0">
        <DialogHeader>
          <DialogTitle>{user.name}</DialogTitle>
          <DialogDescription>{user.email}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid h-20 w-20 place-items-center rounded-full premium-gradient text-2xl font-semibold text-white">{user.name?.[0]}</div>
          <Badge tone="violet">{user.role}</Badge>
          <div className="rounded-md bg-secondary/70 p-4 text-sm">
            <p>Status: {user.status}</p>
            <p className="mt-2">Tenant: {user.tenant}</p>
            <p className="mt-2">Joined: {user.joined ? new Date(user.joined).toLocaleDateString() : "-"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
