import { Badge } from "@/components/ui/badge";
import type { BloodRequestStatus } from "@/types/enum";

interface BloodRequestStatusBadgeProps {
  status: BloodRequestStatus;
}

const statusStyles: Record<string, string> = {
  open: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  pending:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  partially_fulfilled:
    "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  fulfilled:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  completed:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  cancelled: "border-muted bg-muted text-muted-foreground",
  expired: "border-muted bg-muted text-muted-foreground",
};

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function BloodRequestStatusBadge({
  status,
}: BloodRequestStatusBadgeProps) {
  const value = String(status).toLowerCase();

  return (
    <Badge
      variant='outline'
      className={statusStyles[value] ?? "border-border bg-muted/50"}
    >
      {formatLabel(value)}
    </Badge>
  );
}
