import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  Clock3Icon,
  DropletsIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { ProfileInfoItem } from "./profile-info-item";
import { ProfileSection } from "./profile-section";
import { DonorProfile } from "@/types/donor.profile";
import { normalizeBloodGroup } from "@/utils/blood.group.normalize";
import { dateFormat } from "@/utils/date.format";

interface DonorInformationProps {
  donor?: DonorProfile;
}

function getAvailabilityLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function DonorInformation({ donor }: DonorInformationProps) {
  if (!donor) {
    return null;
  }

  return (
    <ProfileSection
      icon={DropletsIcon}
      title='Donor Information'
      description='Your blood donation profile and eligibility.'
      className='border-brand/20'
      contentClassName='space-y-5 p-5 sm:space-y-6 sm:p-6 lg:p-8'
    >
      <div className='gap-5 sm:gap-6 grid sm:grid-cols-2 lg:grid-cols-4'>
        <ProfileInfoItem
          icon={DropletsIcon}
          label='Blood Group'
          value={
            <span className='font-bold text-brand'>
              {normalizeBloodGroup(donor.bloodGroup)}
            </span>
          }
        />

        <ProfileInfoItem
          icon={ShieldCheckIcon}
          label='Availability'
          value={
            <Badge
              variant={
                donor.availability === "available" ? "secondary" : "outline"
              }
            >
              {getAvailabilityLabel(donor.availability)}
            </Badge>
          }
        />

        <ProfileInfoItem
          icon={DropletsIcon}
          label='Total Donations'
          value={donor.totalDonations}
        />

        <ProfileInfoItem
          icon={ShieldCheckIcon}
          label='Eligibility'
          value={
            donor.isEligible ? (
              <Badge variant='secondary'>
                <CheckCircle2Icon className='size-3.5' />
                Eligible
              </Badge>
            ) : (
              <Badge variant='outline'>
                <XCircleIcon className='size-3.5' />
                Not eligible
              </Badge>
            )
          }
        />
      </div>

      <Separator />

      <div className='gap-5 sm:gap-6 grid sm:grid-cols-2 lg:grid-cols-4'>
        <ProfileInfoItem
          icon={CalendarDaysIcon}
          label='Last Donation'
          value={dateFormat(donor.lastDonationAt)}
        />

        <ProfileInfoItem
          icon={CalendarDaysIcon}
          label='Eligibility Checked'
          value={dateFormat(donor.eligibilityCheckedAt)}
        />

        <ProfileInfoItem
          icon={CalendarDaysIcon}
          label='Donor Profile Created'
          value={dateFormat(donor.createdAt)}
        />

        <ProfileInfoItem
          icon={Clock3Icon}
          label='Donor Profile Updated'
          value={dateFormat(donor.updatedAt)}
        />
      </div>
    </ProfileSection>
  );
}
