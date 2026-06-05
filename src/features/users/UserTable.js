"use client";

import { Eye, Plus, Trash2 } from "lucide-react";
import DataTable from "@/components/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import UserDrawer from "./UserDrawer";
import UserForm from "./UserForm";

export default function UserTable({ users, mutations }) {
  const columns = [
    { accessorKey: "name", header: "User", cell: ({ row }) => <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-secondary font-medium">{row.original.name?.[0]}</div><div><p>{row.original.name}</p><p className="text-xs text-muted-foreground">{row.original.email}</p></div></div> },
    { accessorKey: "role", header: "Role", cell: ({ row }) => <Badge tone="violet">{row.original.role}</Badge> },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <Badge tone={row.original.status === "ACTIVE" ? "green" : "red"}>{row.original.status}</Badge> },
    { accessorKey: "tenant", header: "Tenant" },
    { id: "actions", header: "Actions", cell: ({ row }) => <div className="flex gap-2"><UserDrawer user={row.original} trigger={<Button size="icon" variant="ghost"><Eye className="h-4 w-4" /></Button>} /><Button size="icon" variant="ghost" onClick={() => window.confirm("Delete this user?") && mutations.deleteUser.mutate(row.original.id)}><Trash2 className="h-4 w-4" /></Button></div> }
  ];
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4" /> Add User</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>Add user</DialogTitle><DialogDescription>Invite a teammate into the admin workspace.</DialogDescription></DialogHeader><UserForm onSubmit={(payload) => mutations.createUser.mutate(payload)} isPending={mutations.createUser.isPending} /></DialogContent>
        </Dialog>
      </div>
      <DataTable data={users} columns={columns} searchPlaceholder="Search users..." />
    </div>
  );
}
