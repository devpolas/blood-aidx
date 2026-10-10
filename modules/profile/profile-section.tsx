import { PencilIcon, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Heading3,
  Heading4,
  Heading5,
  Muted,
} from "@/components/typography/typography";
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
    <Card className={cn("py-0 overflow-hidden", className)}>
      <CardHeader className='p-4 sm:p-5 border-brand/20 border-b'>
        <div className='flex justify-between items-start gap-4'>
          <div className='flex items-start gap-2 min-w-0'>
            <div className='flex justify-center items-center bg-brand/10 mt-0.5 rounded-lg size-8 text-brand shrink-0'>
              <Icon className='mt-0.5 size-6 text-brand shrink-0' />
            </div>

            <div className='min-w-0'>
              <Heading4 className='text-lg sm:text-xl'>{title}</Heading4>

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
