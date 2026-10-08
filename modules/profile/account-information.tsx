import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  MailIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "lucide-react";

import type { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { Muted, Paragraph } from "@/components/typography/typography";
import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { dateFormat } from "@/utils/date.format";

interface AccountInformationProps {
  user: User;
}

export function AccountInformation({ user }: AccountInformationProps) {
  return (
    <ProfileSection
      icon={ShieldCheckIcon}
      title='Account Information'
      description='Your account status and activity.'
      contentClassName='space-y-5 p-5 sm:p-6'
    >
      <div className='gap-5 sm:gap-6 grid sm:grid-cols-2'>
        <ProfileInfoItem
          icon={ShieldCheckIcon}
          label='Account Role'
          value={
            <span className='capitalize'>{user.role.replaceAll("_", " ")}</span>
          }
        />

        <ProfileInfoItem
          icon={MailIcon}
          label='Email Status'
          value={
            user.emailVerified ? (
              <Badge variant='secondary'>
                <CheckCircle2Icon className='size-3.5 text-brand-success' />
                Verified
              </Badge>
            ) : (
              <Badge variant='outline'>
                <Clock3Icon className='size-3.5' />
                Pending verification
              </Badge>
            )
          }
        />

        <ProfileInfoItem
          icon={ShieldCheckIcon}
          label='Account Status'
          value={
            user.banned ? (
              <Badge variant='destructive'>
                <XCircleIcon className='size-3.5' />
                Banned
              </Badge>
            ) : (
              <Badge variant='secondary'>
                <CheckCircle2Icon className='size-3.5 text-brand-success' />
                Active
              </Badge>
            )
          }
        />

        <ProfileInfoItem
          icon={CalendarDaysIcon}
          label='Created'
          value={dateFormat(user.createdAt)}
        />

        <ProfileInfoItem
          icon={Clock3Icon}
          label='Last Updated'
          value={dateFormat(user.updatedAt)}
        />
      </div>

      {user.banned && (
        <>
          <div className='bg-destructive/5 p-4 border border-destructive/20 rounded-lg'>
            <Muted className='text-destructive'>Ban Information</Muted>

            <Paragraph className='mt-1 wrap-break-words'>
              {user.banReason || "No reason provided."}
            </Paragraph>

            {user.banExpires && (
              <Muted className='mt-2'>
                Expires: {dateFormat(user.banExpires)}
              </Muted>
            )}
          </div>
        </>
      )}
    </ProfileSection>
  );
}
