import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  LogOutIcon,
  MailIcon,
} from "lucide-react";

import type { User } from "@/types/user";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { namePerfect } from "@/utils/refine.name";
import { getInitials } from "@/utils/initials.helper";
import { Heading3, Large, Small } from "@/components/typography/typography";
import { dateFormat } from "@/utils/date.format";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { useIsMobile } from "@/hooks";

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
  const isMobile = useIsMobile();
  return (
    <Card className='overflow-hidden'>
      <div className='p-4 border-brand/20 border-b'>
        <div className='flex flex-row justify-between lg:items-center gap-5 sm:gap-6'>
          <div className='flex items-center gap-3 sm:gap-5 min-w-0'>
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
              <div className='flex flex-wrap items-center gap-2 min-w-0'>
                <Heading3 className='min-w-0 text-lg sm:text-xl lg:text-2xl truncate'>
                  {namePerfect(user.name)}
                </Heading3>

                {user.emailVerified ? (
                  <Badge variant='secondary' className='shrink-0'>
                    <CheckCircle2Icon className='size-3.5 text-brand-success' />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant='outline' className='shrink-0'>
                    <Clock3Icon className='size-3.5' />
                    Unverified
                  </Badge>
                )}
              </div>

              <div className='flex items-center gap-2 min-w-0 text-muted-foreground'>
                <MailIcon className='size-4 shrink-0' />

                <span className='min-w-0 text-xs sm:text-sm truncate'>
                  {user.email}
                </span>
              </div>

              <Badge className='capitalize'>
                {user.role.replaceAll("_", " ")}
              </Badge>
            </div>
          </div>

          <Button
            disabled={isLogoutPending}
            onClick={logout}
            variant='destructive'
            className='cursor-pointer shrink-0'
            size={isMobile ? "sm" : "default"}
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
                <LogOutIcon className='text-destructive' />
                <span className='text-destructive'>Logout</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <CardContent className='gap-5 sm:gap-6 grid sm:grid-cols-2 lg:grid-cols-4 p-4 sm:p-6 lg:p-8'>
        <div className='min-w-0'>
          <Small>Gender</Small>
          <Large className='mt-1 warp-break-words'>
            {user.gender ? namePerfect(user.gender.replaceAll("_", " ")) : "—"}
          </Large>
        </div>

        <div className='min-w-0'>
          <Small>Member Since</Small>
          <Large className='flex items-center gap-2 mt-1'>
            <CalendarDaysIcon className='size-4 text-brand shrink-0' />
            {dateFormat(user.createdAt)}
          </Large>
        </div>

        <div className='min-w-0'>
          <Small>Account Status</Small>
          <div className='mt-1'>
            {user.banned ? (
              <Badge variant='destructive'>Banned</Badge>
            ) : (
              <Badge variant='secondary'>
                <CheckCircle2Icon className='size-3.5 text-brand-success' />
                Active
              </Badge>
            )}
          </div>
        </div>

        <div className='min-w-0'>
          <Small>Last Updated</Small>
          <Large className='mt-1'>{dateFormat(user.updatedAt)}</Large>
        </div>
      </CardContent>
    </Card>
  );
}
