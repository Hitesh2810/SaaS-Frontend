"use client";

import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export function DropdownMenuContent({ className, align = "end", ...props }) {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content align={align} className={cn("glass z-50 min-w-48 rounded-lg p-2 shadow-glass", className)} {...props} />
    </DropdownPrimitive.Portal>
  );
}

export function DropdownMenuItem({ className, ...props }) {
  return <DropdownPrimitive.Item className={cn("flex cursor-pointer select-none items-center gap-2 rounded-md px-3 py-2 text-sm outline-none transition hover:bg-secondary", className)} {...props} />;
}
