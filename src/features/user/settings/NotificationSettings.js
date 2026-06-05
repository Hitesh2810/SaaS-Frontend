"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { preferenceDefaults } from "./settings";

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState(preferenceDefaults);
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3"><Bell className="h-5 w-5 text-accent" /><h2 className="text-xl font-semibold">Notification Preferences</h2></div>
      <div className="mt-5 grid gap-3 text-sm">
        {Object.keys(prefs).map((key) => (
          <label key={key} className="flex items-center justify-between rounded-lg bg-secondary p-3 capitalize">
            {key} updates
            <input type="checkbox" checked={prefs[key]} onChange={(event) => setPrefs((current) => ({ ...current, [key]: event.target.checked }))} className="h-4 w-4 accent-slate-950" />
          </label>
        ))}
      </div>
    </Card>
  );
}
