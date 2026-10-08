import type { LucideIcon } from "lucide-react";
import { Heading3 } from "@/components/typography/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileSkeleton, ProfileSkeletonItem } from "./profile-skeleton";

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
      <CardHeader className='p-4 sm:p-5 border-brand/20 border-b'>
        <div className='flex justify-between items-start gap-4'>
          <div className='flex gap-2 min-w-0'>
            <Icon className='mt-0.5 size-5 text-brand/40 shrink-0' />

            <div className='space-y-2 min-w-0'>
              <Heading3 className='text-lg sm:text-xl'>{title}</Heading3>

              <ProfileSkeleton className='w-52 max-w-full h-3.5' />
            </div>
          </div>

          <ProfileSkeleton className='rounded-md w-14 h-9 shrink-0' />
        </div>
      </CardHeader>

      <CardContent className='gap-5 sm:gap-6 grid sm:grid-cols-2 lg:grid-cols-3 p-5 sm:p-6'>
        {Array.from({ length: count }, (_, index) => (
          <ProfileSkeletonItem key={index} />
        ))}
      </CardContent>
    </Card>
  );
}
