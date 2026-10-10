import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  DropletsIcon,
  LogOutIcon,
  MailIcon,
} from "lucide-react";

import type { User } from "@/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading3, Large, Small } from "@/components/typography/typography";
import { LoadingSpinner } from "@/components/shared/loading/loading";

import { dateFormat } from "@/utils/date.format";
import { getInitials } from "@/utils/initials.helper";
import { namePerfect } from "@/utils/refine.name";

interface ProfileHeaderProps {
  user: User;
  logout: () => void;
  isLogoutPending: boolean;
}

export function ProfileHeader({
  user,
  logout,
  isLogoutPending,
}: ProfileHeaderProps) {
  return (
    <Card className='py-0 border-brand/20 overflow-hidden'>
      <div className='relative p-4 sm:p-6 lg:p-8'>
        <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-6'>
          {/* Profile identity */}
          <div className='flex items-center gap-4 sm:gap-5 min-w-0'>
            <Avatar className='border-2 border-brand/20 size-16 sm:size-20 lg:size-24 shrink-0'>
              <AvatarImage
                src={user.image ?? undefined}
                alt={namePerfect(user.name)}
              />

              <AvatarFallback className='bg-brand font-bold text-brand-foreground text-lg sm:text-xl lg:text-2xl'>
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className='space-y-2 min-w-0'>
              {/* Name */}
              <div className='flex flex-wrap items-center gap-2'>
                <Heading3 className='text-lg sm:text-xl lg:text-2xl wrap-break-words'>
                  {namePerfect(user.name)}
                </Heading3>

                {user.emailVerified ? (
                  <Badge variant='secondary' className='gap-1.5 shrink-0'>
                    <CheckCircle2Icon className='size-3.5 text-brand-success' />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant='outline' className='gap-1.5 shrink-0'>
                    <Clock3Icon className='size-3.5' />
                    Unverified
                  </Badge>
                )}
              </div>

              {/* Email */}
              <div className='flex items-center gap-2 min-w-0 text-muted-foreground'>
                <MailIcon className='size-4 shrink-0' />

                <span className='min-w-0 text-xs sm:text-sm truncate'>
                  {user.email}
                </span>
              </div>

              {/* Role */}
              <Badge className='gap-1.5 w-fit capitalize'>
                <DropletsIcon className='size-3.5' />
                {user.role.replaceAll("_", " ")}
              </Badge>
            </div>
          </div>

          <Button
            type='button'
            variant='destructive'
            disabled={isLogoutPending}
            onClick={logout}
            className='cursor-pointer shrink-0'
          >
            {isLogoutPending ? (
              <LoadingSpinner
                spinnerClassName='text-brand'
                textClassName='text-brand'
                text='Logging out'
                shimmer
              />
            ) : (
              <>
                <LogOutIcon />
                Logout
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Account overview */}
      <CardContent className='gap-0 grid grid-cols-2 lg:grid-cols-4 p-0 border-brand/10 border-t'>
        {/* Gender */}
        <div className='p-4 sm:p-5 lg:p-6 border-border/60 border-r min-w-0'>
          <Small>Gender</Small>

          <Large className='mt-1 wrap-break-words'>
            {user.gender ? namePerfect(user.gender.replaceAll("_", " ")) : "—"}
          </Large>
        </div>

        {/* Member since */}
        <div className='p-4 sm:p-5 lg:p-6 border-border/60 lg:border-r border-b lg:border-b-0 min-w-0'>
          <Small>Member Since</Small>

          <Large className='flex items-center gap-2 mt-1'>
            <CalendarDaysIcon className='size-4 text-brand shrink-0' />

            <span className='truncate'>{dateFormat(user.createdAt)}</span>
          </Large>
        </div>

        {/* Account status */}
        <div className='p-4 sm:p-5 lg:p-6 border-border/60 border-r min-w-0'>
          <Small>Account Status</Small>

          <div className='mt-1'>
            {user.banned ? (
              <Badge variant='destructive'>Banned</Badge>
            ) : (
              <Badge variant='secondary' className='gap-1.5'>
                <CheckCircle2Icon className='size-3.5 text-brand-success' />
                Active
              </Badge>
            )}
          </div>
        </div>

        {/* Last updated */}
        <div className='p-4 sm:p-5 lg:p-6 min-w-0'>
          <Small>Last Updated</Small>

          <Large className='mt-1 wrap-break-words'>
            {dateFormat(user.updatedAt)}
          </Large>
        </div>
      </CardContent>
    </Card>
  );
}
