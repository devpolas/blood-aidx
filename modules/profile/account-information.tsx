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

import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { dateFormat } from "@/utils/date.format";
import { Muted, Paragraph } from "@/components/typography/typography";

interface AccountInformationProps {
  user: User;
}

export function AccountInformation({ user }: AccountInformationProps) {
  return (
    <ProfileSection
      icon={ShieldCheckIcon}
      title='Account Information'
      description='Your account status and activity.'
      contentClassName='grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6'
    >
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

      {user.banned && (
        <div className='sm:col-span-2 bg-destructive/5 p-4 border border-destructive/20 rounded-lg min-w-0'>
          <Muted className='text-destructive'>Ban Information</Muted>

          <Paragraph className='mt-1 warp-break-words'>
            {user.banReason || "No reason provided."}
          </Paragraph>

          {user.banExpires && (
            <Muted className='mt-2'>
              Expires: {dateFormat(user.banExpires)}
            </Muted>
          )}
        </div>
      )}
    </ProfileSection>
  );
}
