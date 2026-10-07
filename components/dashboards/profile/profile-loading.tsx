"use client";

import { CalendarDaysIcon, MapPinIcon, UserIcon } from "lucide-react";

import {
  LoadingMarkerState,
  LoadingStep,
  LoadingSteps,
} from "@/components/shared/loading/loading";
import { Heading2, Muted } from "@/components/typography/typography";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileHeaderLoading } from "@/modules/profile/profile-header-loading";
import { ProfileSectionLoading } from "@/modules/profile/profile-section-loading";

interface ProfileLoadingProps {
  isProfileLoading?: boolean;
  isLocationLoading?: boolean;
  isDonorLoading?: boolean;
  isDonor?: boolean;
}

export function ProfileLoading({
  isProfileLoading = true,
  isLocationLoading = true,
  isDonorLoading = false,
  isDonor = false,
}: ProfileLoadingProps) {
  const getLoadingState = (isLoading: boolean): LoadingMarkerState => {
    return isLoading ? "active" : "completed";
  };

  const steps: LoadingStep[] = [
    {
      id: "profile",
      label: "Loading personal and account information",
      state: getLoadingState(isProfileLoading),
    },
    {
      id: "location",
      label: "Loading location information",
      state: getLoadingState(isLocationLoading),
    },
  ];

  if (isDonor) {
    steps.push({
      id: "donor",
      label: "Loading donor information",
      state: getLoadingState(isDonorLoading),
    });
  }

  return (
    <main className='space-y-5 sm:space-y-6 mx-auto py-5 sm:py-8 w-full max-w-6xl'>
      <header className='space-y-2'>
        <Heading2>My Profile</Heading2>
        <Muted>Preparing your profile information...</Muted>
      </header>

      <Card className='border-brand/10'>
        <CardContent className='p-4 sm:p-5 lg:p-6'>
          <LoadingSteps steps={steps} duration={2000} />
        </CardContent>
      </Card>

      <ProfileHeaderLoading />

      <div className='gap-5 lg:gap-6 grid lg:grid-cols-2'>
        <ProfileSectionLoading
          icon={UserIcon}
          title='Personal Information'
          count={4}
        />

        <ProfileSectionLoading
          icon={UserIcon}
          title='Account Information'
          count={4}
        />

        <ProfileSectionLoading
          icon={UserIcon}
          title='Contact Information'
          count={2}
        />

        <ProfileSectionLoading
          icon={MapPinIcon}
          title='Location Information'
          count={4}
        />
      </div>

      {isDonor && (
        <ProfileSectionLoading
          icon={UserIcon}
          title='Donor Information'
          count={6}
          wide
        />
      )}

      <ProfileSectionLoading
        icon={CalendarDaysIcon}
        title='Profile Activity'
        count={2}
      />
    </main>
  );
}
