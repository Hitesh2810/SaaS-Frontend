"use client";

import { Input } from "@/components/ui/Input";

export default function BrandingSettings({ values = {} }) {
  return <div className="grid gap-3"><Input placeholder="Brand color" defaultValue={values.brand_color || "#14b8a6"} /><Input placeholder="Logo URL" defaultValue={values.logo_url || ""} /></div>;
}
