"use client";

import {
  DropletsIcon,
  MapPinIcon,
  ShieldUserIcon,
  UserIcon,
} from "lucide-react";

import { Heading2, Muted } from "@/components/typography/typography";

import { ProfileHeaderLoading } from "@/modules/profile/loading/profile-header-loading";
import { ProfileSectionLoading } from "@/modules/profile/loading/profile-section-loading";

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
  const loadingMessage = isProfileLoading
    ? "Loading your profile information..."
    : isLocationLoading
      ? "Loading your location information..."
      : isDonor && isDonorLoading
        ? "Loading your donor information..."
        : "Preparing your profile...";

  return (
    <main
      className='space-y-5 sm:space-y-6 mx-auto w-full'
      aria-busy='true'
      aria-live='polite'
    >
      <header className='space-y-1'>
        <Heading2>Profile</Heading2>
        <Muted>{loadingMessage}</Muted>
      </header>

      <ProfileHeaderLoading />

      <div className='gap-5 lg:gap-6 grid lg:grid-cols-2'>
        <ProfileSectionLoading
          icon={UserIcon}
          title='Personal Information'
          count={5}
        />

        <ProfileSectionLoading
          icon={ShieldUserIcon}
          title='Account Information'
          count={5}
        />

        <ProfileSectionLoading
          icon={MapPinIcon}
          title='Location'
          count={7}
          wide
        />

        {isDonor && (
          <ProfileSectionLoading
            icon={DropletsIcon}
            title='Donor Information'
            count={8}
            wide
          />
        )}
      </div>
    </main>
  );
}
