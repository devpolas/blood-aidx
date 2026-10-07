import { CalendarDaysIcon, MailIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileSkeleton } from "./profile-skeleton";

export function ProfileHeaderLoading() {
  return (
    <Card className='overflow-hidden'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-row justify-between gap-5 sm:gap-6'>
          <div className='flex items-center gap-3 sm:gap-5 min-w-0'>
            <div className='flex justify-center items-center bg-brand/10 border-2 border-brand/20 rounded-full size-16 sm:size-20 lg:size-24 animate-pulse shrink-0'>
              <UserIcon className='size-7 sm:size-8 lg:size-10 text-brand/30' />
            </div>
            <div className='space-y-2 min-w-0'>
              <div className='flex flex-wrap items-center gap-2 min-w-0'>
                <ProfileSkeleton className='w-36 sm:w-48 lg:w-56 h-6 sm:h-7 lg:h-8' />
                <ProfileSkeleton className='rounded-full w-20 h-5' />
              </div>
              <div className='flex items-center gap-2 min-w-0'>
                <MailIcon className='size-4 text-muted-foreground/40 shrink-0' />
                <ProfileSkeleton className='w-40 sm:w-52 max-w-full h-4' />
              </div>
              <ProfileSkeleton className='rounded-full w-20 h-6' />
            </div>
          </div>
          <ProfileSkeleton className='w-20 sm:w-24 h-9 sm:h-10 shrink-0' />
        </div>
      </div>
      <div className='px-4'>
        <Separator />
      </div>
      <CardContent className='gap-5 sm:gap-6 grid sm:grid-cols-2 lg:grid-cols-4 p-4 sm:p-6 lg:p-8'>
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-12 h-3' />
          <ProfileSkeleton className='w-20 h-5' />
        </div>
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-20 h-3' />
          <div className='flex items-center gap-2'>
            <CalendarDaysIcon className='size-4 text-brand/30 shrink-0' />
            <ProfileSkeleton className='w-24 h-5' />
          </div>
        </div>
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-24 h-3' />
          <ProfileSkeleton className='rounded-full w-16 h-6' />
        </div>
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-20 h-3' />
          <ProfileSkeleton className='w-24 h-5' />
        </div>
      </CardContent>
    </Card>
  );
}
