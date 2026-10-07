import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  EditIcon,
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

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className='overflow-hidden'>
      <div className='bg-brand/5 px-4 sm:px-6 lg:px-8 py-5 sm:py-7 border-brand/10 border-b'>
        <div className='flex lg:flex-row flex-col lg:justify-between lg:items-center gap-5 sm:gap-6'>
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
                    <CheckCircle2Icon className='size-3.5' />
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

          <Button variant='outline' className='w-full sm:w-auto shrink-0'>
            <EditIcon className='size-4' />
            Edit Profile
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
                <CheckCircle2Icon className='size-3.5' />
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
