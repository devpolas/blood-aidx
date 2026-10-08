import { PencilIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading3, Muted } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

interface ProfileSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function ProfileSection({
  icon: Icon,
  title,
  description,
  children,
  action,
  className,
  contentClassName,
}: ProfileSectionProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className='p-4 sm:p-5 border-brand/20 border-b'>
        <div className='flex justify-between items-start gap-4'>
          <div className='flex gap-2 min-w-0'>
            <Icon className='mt-0.5 size-5 text-brand shrink-0' />

            <div className='min-w-0'>
              <Heading3 className='text-lg sm:text-xl'>{title}</Heading3>

              <Muted className='mt-1'>{description}</Muted>
            </div>
          </div>

          {action}
        </div>
      </CardHeader>

      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}

interface ProfileEditButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ProfileEditButton({
  onClick,
  disabled = false,
}: ProfileEditButtonProps) {
  return (
    <Button
      type='button'
      variant='destructive'
      size='sm'
      onClick={onClick}
      disabled={disabled}
      className='cursor-pointer shrink-0'
    >
      <PencilIcon className='text-brand-info' />
      Edit
    </Button>
  );
}
