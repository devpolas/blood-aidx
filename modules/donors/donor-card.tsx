"use client";

import Link from "next/link";
import {
  CalendarDays,
  Droplets,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useLocation, useUserById } from "@/hooks";
import type { DonorProfile } from "@/types/donor.profile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heading4, Muted } from "@/components/typography/typography";

type DonorCardProps = {
  donor: DonorProfile;
};

function formatBloodGroup(bloodGroup: string) {
  return bloodGroup
    .replace("_positive", "+")
    .replace("_negative", "-")
    .replace("_", " ")
    .toUpperCase();
}

function formatDate(date: string | null) {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getAvailabilityLabel(availability: DonorProfile["availability"]) {
  const labels: Record<DonorProfile["availability"], string> = {
    available: "Available",
    unavailable: "Unavailable",
    temporarily_unavailable: "Temporarily unavailable",
  };

  return labels[availability];
}

export function DonorCard({ donor }: DonorCardProps) {
  const { data: userResponse, isLoading: isUserLoading } = useUserById(
    donor.userId,
  );

  const user = userResponse?.data?.user;
  const { data: locationResponse, isLoading: isLocationLoading } = useLocation(
    user?.locationId ?? "",
  );
  const location = locationResponse?.data?.location;
  const isLoading = isUserLoading || isLocationLoading;

  const locationLabel = location
    ? [location.city, location.division, location.country]
        .filter(Boolean)
        .join(", ")
    : "Location not provided";

  return (
    <Card className='group hover:shadow-md py-0 hover:border-primary/40 h-full overflow-hidden transition-all'>
      <CardContent className='flex flex-col gap-5 p-5 h-full'>
        <div className='flex items-start gap-3'>
          <Avatar className='size-14 shrink-0'>
            <AvatarImage
              src={user?.image ?? undefined}
              alt={user?.name ?? "Blood donor"}
            />
            <AvatarFallback>
              {user?.name ? (
                getInitials(user.name)
              ) : (
                <UserRound className='size-5' />
              )}
            </AvatarFallback>
          </Avatar>

          <div className='flex-1 min-w-0'>
            <Heading4 className='truncate'>
              {isLoading ? "Loading donor..." : (user?.name ?? "Blood donor")}
            </Heading4>

            <div className='flex items-center gap-1.5 mt-1 text-muted-foreground'>
              <MapPin className='size-3.5 shrink-0' />
              <Muted className='truncate'>{locationLabel}</Muted>
            </div>
          </div>

          <Badge variant='outline' className='gap-1.5 px-2.5 py-1 shrink-0'>
            <Droplets className='size-3.5 text-primary' />
            <span className='font-semibold'>
              {formatBloodGroup(donor.bloodGroup)}
            </span>
          </Badge>
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <Badge
            variant={
              donor.availability === "available" ? "default" : "secondary"
            }
          >
            {getAvailabilityLabel(donor.availability)}
          </Badge>

          <Badge variant='outline' className='gap-1'>
            <ShieldCheck className='size-3.5' />
            {donor.isEligible
              ? "Eligible to donate"
              : "Eligibility unconfirmed"}
          </Badge>
        </div>

        <div className='gap-3 grid grid-cols-2 bg-muted/50 p-3 rounded-xl'>
          <div>
            <Muted>Total donations</Muted>
            <p className='mt-1 font-semibold tabular-nums text-lg'>
              {donor.totalDonations}
            </p>
          </div>

          <div>
            <Muted>Last donation</Muted>
            <p className='mt-1 font-medium text-sm'>
              {formatDate(donor.lastDonationAt)}
            </p>
          </div>
        </div>

        <div className='mt-auto pt-4 border-t'>
          <Link
            href={`/find-donors/${donor.id}`}
            className='inline-flex justify-center items-center bg-primary hover:bg-primary/90 px-4 py-2.5 rounded-lg w-full font-medium text-primary-foreground text-sm transition-colors'
          >
            View donor profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
