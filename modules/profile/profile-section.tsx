import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading3, Muted } from "@/components/typography/typography";

interface ProfileSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ProfileSection({
  icon: Icon,
  title,
  description,
  children,
  className,
  contentClassName,
}: ProfileSectionProps) {
  return (
    <Card className={className}>
      <CardHeader className='gap-1 p-4 border-brand/20 border-b'>
        <div className='flex items-center gap-2'>
          <Icon className='size-5 text-brand shrink-0' />
          <Heading3>{title}</Heading3>
        </div>

        <Muted className='ml-7'>{description}</Muted>
      </CardHeader>

      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}
