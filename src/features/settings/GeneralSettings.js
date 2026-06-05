"use client";

import { Input } from "@/components/ui/Input";

export default function GeneralSettings({ values = {} }) {
  return <div className="grid gap-3"><Input placeholder="Application name" defaultValue={values.app_name?.name || "SaaS Admin"} /><Input placeholder="Support email" defaultValue={values.support_email || ""} /></div>;
}
