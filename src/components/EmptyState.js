import { Inbox } from "lucide-react";

export default function EmptyState({ title = "No records", description = "New data will appear here." }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <Inbox className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
