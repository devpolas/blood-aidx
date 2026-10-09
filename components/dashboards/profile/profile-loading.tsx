"use client";

import {
  DropletsIcon,
  MapPinIcon,
  ShieldUser,
  ShieldUserIcon,
  UserIcon,
} from "lucide-react";

import { Heading4, Muted } from "@/components/typography/typography";

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
        <div className='flex items-center gap-3'>
          <div className='flex justify-center items-center bg-primary/10 rounded-xl shrink-0'>
            <ShieldUser className='size-10 text-primary' />
          </div>

          <div className='min-w-0'>
            <Heading4 className='leading-6'>Profile</Heading4>
            <Muted className='mt-0.5'>{loadingMessage}</Muted>
          </div>
        </div>
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
