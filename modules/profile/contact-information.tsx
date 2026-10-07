import { MailIcon, PhoneIcon } from "lucide-react";

import type { User } from "@/types/user";
import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { UserProfile } from "@/types/user.profile";
import { formatPhone } from "@/utils/phone.format";

interface ContactInformationProps {
  user: User;
  profile?: UserProfile;
}

export function ContactInformation({ user, profile }: ContactInformationProps) {
  return (
    <ProfileSection
      icon={PhoneIcon}
      title='Contact Information'
      description='Your contact details.'
      contentClassName='grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6'
    >
      <ProfileInfoItem
        icon={PhoneIcon}
        label='Phone Number'
        value={formatPhone(profile?.phone ?? null)}
      />

      <ProfileInfoItem
        icon={MailIcon}
        label='Email Address'
        value={user.email}
      />
    </ProfileSection>
  );
}
