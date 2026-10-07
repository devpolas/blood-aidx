import { CalendarDaysIcon, MailIcon, UserIcon } from "lucide-react";

import type { User } from "@/types/user";
import { Separator } from "@/components/ui/separator";

import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { UserProfile } from "@/types/user.profile";
import { namePerfect } from "@/utils/refine.name";
import { dateFormat } from "@/utils/date.format";
import { Paragraph, Small } from "@/components/typography/typography";

interface PersonalInformationProps {
  user: User;
  profile?: UserProfile;
}

export function PersonalInformation({
  user,
  profile,
}: PersonalInformationProps) {
  return (
    <ProfileSection
      icon={UserIcon}
      title='Personal Information'
      description='Your basic personal information.'
      contentClassName='grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6'
    >
      <ProfileInfoItem
        icon={UserIcon}
        label='Full Name'
        value={namePerfect(user.name)}
      />

      <ProfileInfoItem
        icon={MailIcon}
        label='Email Address'
        value={user.email}
      />

      <ProfileInfoItem
        icon={UserIcon}
        label='Gender'
        value={
          user.gender ? namePerfect(user.gender.replaceAll("_", " ")) : "—"
        }
      />

      <ProfileInfoItem
        icon={CalendarDaysIcon}
        label='Date of Birth'
        value={dateFormat(profile?.dateOfBirth ?? null)}
      />

      <div className='sm:col-span-2 min-w-0'>
        <Separator className='mb-5' />

        <Small>Bio</Small>

        <Paragraph className='mt-2 warp-break-words'>
          {profile?.bio?.trim() || "No bio added yet."}
        </Paragraph>
      </div>
    </ProfileSection>
  );
}
