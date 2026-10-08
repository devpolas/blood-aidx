import { CalendarDaysIcon, MailIcon, UserIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { ProfileSkeleton } from "./profile-skeleton";

export function ProfileHeaderLoading() {
  return (
    <Card className='border-brand/20 overflow-hidden' aria-hidden='true'>
      {/* Profile identity */}
      <div className='p-4 sm:p-6 lg:p-8'>
        <div className='flex lg:flex-row flex-col lg:justify-between lg:items-start gap-5'>
          <div className='flex items-center gap-4 sm:gap-5 min-w-0'>
            {/* Avatar */}
            <div className='flex justify-center items-center bg-brand/10 border-2 border-brand/20 rounded-full size-16 sm:size-20 lg:size-24 shrink-0'>
              <UserIcon className='size-7 sm:size-8 lg:size-10 text-brand/30' />
            </div>

            {/* Identity */}
            <div className='space-y-2.5 min-w-0'>
              {/* Name + verification */}
              <div className='flex flex-wrap items-center gap-2'>
                <ProfileSkeleton className='w-36 sm:w-48 lg:w-56 h-6 sm:h-7 lg:h-8' />

                <ProfileSkeleton className='rounded-full w-20 h-5' />
              </div>

              {/* Email */}
              <div className='flex items-center gap-2 min-w-0'>
                <MailIcon className='size-4 text-muted-foreground/30 shrink-0' />

                <ProfileSkeleton className='w-40 sm:w-52 max-w-full h-4' />
              </div>

              {/* Role */}
              <ProfileSkeleton className='rounded-full w-20 h-6' />
            </div>
          </div>

          {/* Actions */}
          <div className='flex gap-2'>
            <ProfileSkeleton className='w-24 h-9 sm:h-10' />

            <ProfileSkeleton className='w-20 sm:w-24 h-9 sm:h-10' />
          </div>
        </div>
      </div>

      {/* Account summary */}
      <CardContent className='gap-5 sm:gap-6 grid grid-cols-2 lg:grid-cols-4 p-4 sm:p-6 lg:p-8 border-brand/10 border-t'>
        {/* Gender */}
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-12 h-3' />
          <ProfileSkeleton className='w-20 max-w-full h-5' />
        </div>

        {/* Member since */}
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-20 h-3' />

          <div className='flex items-center gap-2'>
            <CalendarDaysIcon className='size-4 text-brand/30 shrink-0' />
            <ProfileSkeleton className='w-24 max-w-full h-5' />
          </div>
        </div>

        {/* Account status */}
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-24 h-3' />
          <ProfileSkeleton className='rounded-full w-16 h-6' />
        </div>

        {/* Last updated */}
        <div className='space-y-2 min-w-0'>
          <ProfileSkeleton className='w-20 h-3' />
          <ProfileSkeleton className='w-24 max-w-full h-5' />
        </div>
      </CardContent>
    </Card>
  );
}
