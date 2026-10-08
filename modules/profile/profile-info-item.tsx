import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Small } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

interface ProfileInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  className?: string;
}

export function ProfileInfoItem({
  icon: Icon,
  label,
  value,
  className,
}: ProfileInfoItemProps) {
  return (
    <div className={cn("flex gap-3 min-w-0", className)}>
      <div className='flex justify-center items-center bg-brand/10 mt-0.5 rounded-lg size-9 text-brand shrink-0'>
        <Icon className='size-4' />
      </div>

      <div className='flex-1 min-w-0'>
        <Small>{label}</Small>

        <div className='mt-1 font-semibold text-foreground text-sm sm:text-base wrap-break-words leading-6'>
          {value}
        </div>
      </div>
    </div>
  );
}
