"use client";

import { XCircleIcon } from "lucide-react";

import {
  useAuth,
  useMyDonorProfile,
  useMyLocation,
  useMyProfile,
} from "@/hooks";

import { Card, CardContent } from "@/components/ui/card";

import {
  Heading2,
  Heading3,
  Muted,
  Paragraph,
} from "@/components/typography/typography";

import { ProfileHeader } from "@/modules/profile/profile-header";
import { PersonalInformation } from "@/modules/profile/personal-information";
import { AccountInformation } from "@/modules/profile/account-information";
import { ContactInformation } from "@/modules/profile/contact-information";
import { LocationInformation } from "@/modules/profile/location-information";
import { DonorInformation } from "@/modules/profile/donor-information";
import { ProfileActivity } from "@/modules/profile/profile-activity";
import { ProfileLoading } from "./profile-loading";

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading, error: authError } = useAuth();
  const { data: profileResponse, isPending: isProfileLoading } = useMyProfile();
  const { data: donorResponse, isPending: isDonorLoading } =
    useMyDonorProfile();
  const { data: locationResponse, isPending: isLocationLoading } =
    useMyLocation();

  if (isAuthLoading) {
    return <ProfileLoading />;
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center px-4 min-h-[60vh]'>
        <Card className='w-full max-w-md'>
          <CardContent className='flex flex-col items-center gap-3 py-10 text-center'>
            <XCircleIcon className='size-10 text-destructive' />

            <Heading3>Unable to load profile</Heading3>

            <Muted>{authError ?? "Your account could not be loaded."}</Muted>
          </CardContent>
        </Card>
      </div>
    );
  }

  const profile = profileResponse?.data?.profile;
  const donor = donorResponse?.data?.donor;
  const location = locationResponse?.data?.location;
  const isDonor = user.role === "user";

  const isLoading =
    isProfileLoading || isLocationLoading || (isDonor && isDonorLoading);

  if (isLoading) {
    return (
      <ProfileLoading
        isProfileLoading={isProfileLoading}
        isLocationLoading={isLocationLoading}
        isDonorLoading={isDonorLoading}
        isDonor={isDonor}
      />
    );
  }

  return (
    <main className='space-y-5 sm:space-y-6 mx-auto py-5 sm:py-8 w-full max-w-6xl'>
      <header className='space-y-2'>
        <Heading2>My Profile</Heading2>

        <Paragraph>
          Manage your personal information, donor details, location, and account
          information.
        </Paragraph>
      </header>

      <ProfileHeader user={user} />

      <div className='gap-5 lg:gap-6 grid lg:grid-cols-2'>
        <PersonalInformation user={user} profile={profile} />
        <AccountInformation user={user} />
        <ContactInformation user={user} profile={profile} />
        <LocationInformation location={location} />
      </div>

      {isDonor && <DonorInformation donor={donor} />}

      <ProfileActivity profile={profile} />
    </main>
  );
}
