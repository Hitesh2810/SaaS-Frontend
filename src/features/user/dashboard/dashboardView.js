"use client";

import UserPortalShell from "./UserPortalShell";
import DashboardCards from "./DashboardCards";
import DashboardStats from "./DashboardStats";
import { buildDashboardStats, getActiveSubscription, useUserNotifications, useUserPayments, useUserSubscriptions } from "./dashboard";
import { useUserAuth } from "@/contexts/UserAuthContext";

export default function UserDashboardView() {
  const { user } = useUserAuth();
  const subscriptions = useUserSubscriptions();
  const payments = useUserPayments();
  const notifications = useUserNotifications();
  const subscriptionList = subscriptions.data || [];
  const paymentList = payments.data || [];
  const notificationList = notifications.data || [];
  const stats = buildDashboardStats({ subscriptions: subscriptionList, payments: paymentList, notifications: notificationList, user });

  return (
    <UserPortalShell>
      <DashboardStats stats={stats} />
      <DashboardCards user={user} subscription={getActiveSubscription(subscriptionList)} payments={paymentList} notifications={notificationList} />
    </UserPortalShell>
  );
}
