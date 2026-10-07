"use client";

import { useEffect } from "react";
import { XCircleIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  useAuth,
  useCurrentUser,
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
import Loading from "@/app/loading";

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    logout,
    isLogoutPending,
  } = useAuth();

  const { data: userResponse, isLoading: isUserLoading } = useCurrentUser();

  const { data: profileResponse, isPending: isProfileLoading } = useMyProfile();

  const { data: donorResponse, isPending: isDonorLoading } =
    useMyDonorProfile();

  const { data: locationResponse, isPending: isLocationLoading } =
    useMyLocation();

  const user = userResponse?.data?.user;
  const profile = profileResponse?.data?.profile;
  const donor = donorResponse?.data?.donor;
  const location = locationResponse?.data?.location;

  const search = searchParams.toString();
  const callbackUrl = `${pathname}${search ? `?${search}` : ""}`;

  useEffect(() => {
    if (isAuthLoading || isAuthenticated) {
      return;
    }

    router.replace(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }, [isAuthLoading, isAuthenticated, callbackUrl, router]);

  async function logoutCurrentUser() {
    await logout();

    router.replace(`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Loading />;
  }

  if (isUserLoading) {
    return <ProfileLoading />;
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center px-4 min-h-[60vh]'>
        <Card className='w-full max-w-md'>
          <CardContent className='flex flex-col items-center gap-3 py-10 text-center'>
            <XCircleIcon className='size-10 text-destructive' />

            <Heading3>Unable to load profile</Heading3>

            <Muted>Your account could not be loaded.</Muted>
          </CardContent>
        </Card>
      </div>
    );
  }

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
    <section className='space-y-4 mx-auto w-full'>
      <header>
        <Heading2>Profile</Heading2>

        <Paragraph>
          Manage your personal information, donor details, location, and account
          information.
        </Paragraph>
      </header>

      <ProfileHeader
        user={user}
        logout={logoutCurrentUser}
        isLogoutPending={isLogoutPending}
      />

      <div className='gap-4 grid lg:grid-cols-2'>
        <PersonalInformation user={user} profile={profile} />
        <AccountInformation user={user} />
        <ContactInformation user={user} profile={profile} />
        <LocationInformation location={location} />
      </div>

      {isDonor && <DonorInformation donor={donor} />}

      <ProfileActivity profile={profile} />
    </section>
  );
}
