"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import NotificationDrawer from "./NotificationDrawer";
import NotificationList from "./NotificationList";
import { useNotificationMutations, useNotifications } from "./notifications";

export default function NotificationsView() {
  const { data = [], isLoading } = useNotifications();
  const mutations = useNotificationMutations();
  return (
    <AppShell>
      <PageHeader eyebrow="Messaging" title="Notifications" description="Real-time polling, read state, and message delivery controls." action={<NotificationDrawer mutations={mutations} />} />
      {isLoading ? <LoadingState label="Loading notifications" /> : <NotificationList notifications={data} mutations={mutations} />}
    </AppShell>
  );
}
