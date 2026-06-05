"use client";

import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  const variants = {
    default: "bg-primary text-primary-foreground shadow-sm hover:shadow-glow",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-secondary text-foreground",
    outline: "border bg-background/40 hover:bg-secondary",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    icon: "h-10 w-10"
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
