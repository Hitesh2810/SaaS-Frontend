"use client";

import { Input } from "@/components/ui/Input";

export default function SMTPSettings({ values = {} }) {
  return <div className="grid gap-3"><Input placeholder="SMTP host" defaultValue={values.host || ""} /><Input placeholder="SMTP port" defaultValue={values.port || "587"} /><Input placeholder="Sender email" defaultValue={values.sender || ""} /></div>;
}
