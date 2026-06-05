"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }) {
  return <TabsPrimitive.List className={cn("inline-flex rounded-md bg-secondary p-1", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }) {
  return <TabsPrimitive.Trigger className={cn("rounded px-3 py-1.5 text-sm text-muted-foreground transition data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className)} {...props} />;
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn("mt-5 outline-none", className)} {...props} />;
}
