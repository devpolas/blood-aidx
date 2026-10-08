"use client";

import { useState } from "react";
import { CalendarDaysIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

import type { User } from "@/types/user";
import type { UserProfile } from "@/types/user.profile";

import { Separator } from "@/components/ui/separator";
import { Paragraph, Small } from "@/components/typography/typography";
import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection, ProfileEditButton } from "./profile-section";

import { namePerfect } from "@/utils/refine.name";
import { dateFormat } from "@/utils/date.format";
import { formatPhone } from "@/utils/phone.format";
import { EditPersonalInformationDialog } from "./dialogs/edit-personal-information-dialog";

interface PersonalInformationProps {
  user: User;
  profile?: UserProfile;
}

export function PersonalInformation({
  user,
  profile,
}: PersonalInformationProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfileSection
        icon={UserIcon}
        title='Personal Information'
        description='Your basic personal and contact information.'
        action={<ProfileEditButton onClick={() => setOpen(true)} />}
        contentClassName='space-y-5 p-5 sm:p-6'
      >
        <div className='gap-5 sm:gap-6 grid sm:grid-cols-2'>
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
            icon={PhoneIcon}
            label='Phone Number'
            value={formatPhone(profile?.phone ?? null)}
          />

          <ProfileInfoItem
            icon={CalendarDaysIcon}
            label='Date of Birth'
            value={dateFormat(profile?.dateOfBirth ?? null)}
          />
        </div>

        <Separator />

        <div className='min-w-0'>
          <Small>Bio</Small>

          <Paragraph className='mt-2 wrap-break-words'>
            {profile?.bio?.trim() || "No bio added yet."}
          </Paragraph>
        </div>
      </ProfileSection>

      <EditPersonalInformationDialog
        user={user}
        profile={profile}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
