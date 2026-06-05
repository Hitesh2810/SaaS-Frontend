"use client";

import UserPortalShell from "@/features/user/dashboard/UserPortalShell";
import ProfileForm from "@/features/user/profile/ProfileForm";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import ThemeSettings from "./ThemeSettings";

export default function UserSettingsView() {
  return (
    <UserPortalShell>
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage profile, security, notifications, and theme preferences.</p>
      </div>
      <div className="grid gap-5">
        <ProfileForm />
        <div className="grid gap-5 lg:grid-cols-3">
          <SecuritySettings />
          <NotificationSettings />
          <ThemeSettings />
        </div>
      </div>
    </UserPortalShell>
  );
}
