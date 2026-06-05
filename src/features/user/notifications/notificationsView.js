"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import UserPortalShell from "@/features/user/dashboard/UserPortalShell";
import { Input } from "@/components/ui/Input";
import NotificationDrawer from "./NotificationDrawer";
import NotificationList from "./NotificationList";
import { useNotificationInbox, useUserNotificationMutations } from "./notifications";

export default function UserNotificationsView() {
  const { data = [] } = useNotificationInbox();
  const { markAsRead } = useUserNotificationMutations();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => data.filter((item) => {
    const matches = `${item.title} ${item.message}`.toLowerCase().includes(query.toLowerCase());
    const status = filter === "all" || (filter === "unread" ? !item.is_read : item.is_read);
    return matches && status;
  }), [data, filter, query]);
  const unread = data.filter((item) => !item.is_read).length;

  function read(id) {
    markAsRead.mutate(id);
    setSelected((current) => current?.id === id ? { ...current, is_read: true } : current);
  }

  return (
    <UserPortalShell>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Notifications</h1>
          <p className="mt-2 text-sm text-muted-foreground">{unread} unread messages from your admin team.</p>
        </div>
        <div className="flex rounded-lg bg-secondary p-1 text-sm">
          {["all", "unread", "read"].map((item) => <button key={item} className={filter === item ? "rounded-md bg-background px-3 py-2 capitalize" : "px-3 py-2 capitalize text-muted-foreground"} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
      </div>
      <label className="relative mb-5 block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search notifications" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <NotificationList notifications={filtered} onOpen={setSelected} onMarkRead={read} />
      <NotificationDrawer notification={selected} onClose={() => setSelected(null)} onMarkRead={read} />
    </UserPortalShell>
  );
}
