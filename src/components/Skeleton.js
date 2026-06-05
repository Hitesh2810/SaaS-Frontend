import { cn } from "@/lib/utils";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 7 }).map((_, index) => <Skeleton key={index} className="h-12 w-full" />)}
    </div>
  );
}
