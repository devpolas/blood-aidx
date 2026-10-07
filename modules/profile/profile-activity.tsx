import { CalendarDaysIcon, Clock3Icon } from "lucide-react";

import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { UserProfile } from "@/types/user.profile";
import { dateFormat } from "@/utils/date.format";

interface ProfileActivityProps {
  profile?: UserProfile;
}

export function ProfileActivity({ profile }: ProfileActivityProps) {
  if (!profile) {
    return null;
  }

  return (
    <ProfileSection
      icon={Clock3Icon}
      title='Profile Activity'
      description='Profile record information.'
      contentClassName='grid gap-5 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6'
    >
      <ProfileInfoItem
        icon={CalendarDaysIcon}
        label='Profile Created'
        value={dateFormat(profile.createdAt)}
      />

      <ProfileInfoItem
        icon={Clock3Icon}
        label='Profile Updated'
        value={dateFormat(profile.updatedAt)}
      />
    </ProfileSection>
  );
}
