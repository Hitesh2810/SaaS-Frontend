"use client";

import { Moon, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3">{theme === "dark" ? <Moon className="h-5 w-5 text-accent" /> : <Sun className="h-5 w-5 text-accent" />}<h2 className="text-xl font-semibold">Theme Settings</h2></div>
      <p className="mt-3 text-sm text-muted-foreground">Current mode: {theme}</p>
      <Button className="mt-5" variant="outline" onClick={toggleTheme}>{theme === "dark" ? "Use light mode" : "Use dark mode"}</Button>
    </Card>
  );
}
