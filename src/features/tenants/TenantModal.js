"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import TenantForm from "./TenantForm";

export default function TenantModal({ trigger, tenant, onSubmit, isPending }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tenant ? "Edit tenant" : "Add tenant"}</DialogTitle>
          <DialogDescription>Manage tenant identity, domain, and operational status.</DialogDescription>
        </DialogHeader>
        <TenantForm initial={tenant} onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
}
