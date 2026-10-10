import { Badge } from "@/components/ui/badge";
import type { Priority } from "@/types/enum";

interface BloodRequestPriorityBadgeProps {
  priority: Priority;
}

const priorityStyles: Record<string, string> = {
  low: "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  normal: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  high: "border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  urgent: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
};

export function BloodRequestPriorityBadge({
  priority,
}: BloodRequestPriorityBadgeProps) {
  const value = String(priority).toLowerCase();

  return (
    <Badge
      variant='outline'
      className={priorityStyles[value] ?? "border-border bg-muted/50"}
    >
      {value.charAt(0).toUpperCase() + value.slice(1)} priority
    </Badge>
  );
}
