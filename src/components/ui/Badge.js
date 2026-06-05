import { cn } from "@/lib/utils";

export function Badge({ className, tone = "neutral", children }) {
  const tones = {
    neutral: "bg-secondary text-secondary-foreground",
    green: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300",
    blue: "bg-sky-500/12 text-sky-600 dark:text-sky-300",
    red: "bg-rose-500/12 text-rose-600 dark:text-rose-300",
    amber: "bg-amber-500/14 text-amber-700 dark:text-amber-300",
    violet: "bg-violet-500/12 text-violet-600 dark:text-violet-300"
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium", tones[tone], className)}>{children}</span>;
}
