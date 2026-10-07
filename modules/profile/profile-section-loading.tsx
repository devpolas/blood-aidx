import type { LucideIcon } from "lucide-react";

import { Heading3 } from "@/components/typography/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProfileSectionLoadingProps {
  icon: LucideIcon;
  title: string;
  count: number;
  wide?: boolean;
}

export function ProfileSectionLoading({
  icon: Icon,
  title,
  count,
  wide = false,
}: ProfileSectionLoadingProps) {
  return (
    <Card className={wide ? "lg:col-span-2" : undefined}>
      <CardHeader className='gap-2 p-5 sm:p-6'>
        <div className='flex items-center gap-2'>
          <Icon className='size-5 text-brand' />
          <Heading3 className='text-lg sm:text-xl'>{title}</Heading3>
        </div>

        <div className='bg-muted rounded w-60 max-w-full h-4 animate-pulse' />
      </CardHeader>

      <CardContent className='gap-5 grid sm:grid-cols-2 p-5 sm:p-6'>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className='flex gap-3'>
            <div className='bg-brand/10 rounded-lg size-9 animate-pulse shrink-0' />

            <div className='flex-1 space-y-2 min-w-0'>
              <div className='bg-muted rounded w-16 h-3 animate-pulse' />
              <div className='bg-muted rounded w-28 max-w-full h-5 animate-pulse' />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
