"use client";

import UserPortalShell from "@/features/user/dashboard/UserPortalShell";
import ProfileForm from "./ProfileForm";

export default function UserProfileView() {
  return (
    <UserPortalShell>
      <ProfileForm />
    </UserPortalShell>
  );
}
