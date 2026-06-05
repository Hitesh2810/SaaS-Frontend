"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import UserTable from "./UserTable";
import { useUserMutations, useUsers } from "./users";

export default function UsersView() {
  const { data = [], isLoading } = useUsers();
  const mutations = useUserMutations();
  return (
    <AppShell>
      <PageHeader eyebrow="Identity" title="Users" description="Manage roles, access state, and detailed user records." />
      {isLoading ? <LoadingState label="Loading users" /> : <UserTable users={data} mutations={mutations} />}
    </AppShell>
  );
}
