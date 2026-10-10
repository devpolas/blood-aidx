"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Droplets,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useDonor, useLocation, useUserById } from "@/hooks";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading3, Muted } from "@/components/typography/typography";

import type { DonorProfile } from "@/types/donor.profile";
import BackButton from "@/components/shared/back";

function formatBloodGroup(bloodGroup: string) {
  return bloodGroup
    .replace("_positive", "+")
    .replace("_negative", "-")
    .replace("_", " ")
    .toUpperCase();
}

function formatDate(date: string | null) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
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

function DonorDetailsLoading() {
  return (
    <div className='space-y-6 mx-auto w-full'>
      <div className='bg-muted rounded-lg w-32 h-9 animate-pulse' />

      <Card>
        <CardContent className='flex sm:flex-row flex-col sm:items-center gap-5 p-6'>
          <div className='bg-muted rounded-full size-20 animate-pulse' />

          <div className='flex-1 space-y-3'>
            <div className='bg-muted rounded w-48 h-6 animate-pulse' />
            <div className='bg-muted rounded w-64 max-w-full h-4 animate-pulse' />
            <div className='bg-muted rounded-full w-36 h-6 animate-pulse' />
          </div>
        </CardContent>
      </Card>

      <div className='gap-6 grid md:grid-cols-2'>
        {[1, 2].map((item) => (
          <Card key={item}>
            <CardContent className='space-y-4 p-6'>
              <div className='bg-muted rounded w-40 h-5 animate-pulse' />
              {[1, 2, 3, 4].map((row) => (
                <div
                  key={row}
                  className='bg-muted/70 rounded h-10 animate-pulse'
                />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-start gap-3 py-3'>
      <div className='flex justify-center items-center bg-primary/10 rounded-lg size-9 text-primary shrink-0'>
        <Icon className='size-4' />
      </div>

      <div className='flex-1 min-w-0'>
        <Muted>{label}</Muted>
        <p className='mt-1 font-medium text-sm break-words'>{value}</p>
      </div>
    </div>
  );
}

export function DonorDetails({ donorId }: { donorId: string }) {
  const {
    data: donorResponse,
    isLoading: isDonorLoading,
    isError: isDonorError,
    error: donorError,
  } = useDonor(donorId);

  const donor = donorResponse?.data?.donor;

  const { data: userResponse, isLoading: isUserLoading } = useUserById(
    donor?.userId ?? "",
  );

  const user = userResponse?.data?.user;

  const { data: locationResponse, isLoading: isLocationLoading } = useLocation(
    user?.locationId ?? "",
  );

  const location = locationResponse?.data?.location;

  if (isDonorLoading) {
    return <DonorDetailsLoading />;
  }

  if (isDonorError || !donor) {
    return (
      <div className='flex flex-col justify-center items-center gap-3 mx-auto min-h-80 text-center'>
        <div className='flex justify-center items-center bg-destructive/10 rounded-full size-14 text-destructive'>
          <Droplets className='size-6' />
        </div>

        <Heading3>Donor not found</Heading3>

        <Muted>
          {donorError instanceof Error
            ? donorError.message
            : "This donor profile may have been removed or is unavailable."}
        </Muted>

        <Button variant='outline' className='mt-2'>
          <Link href='/find-donors'>
            <ArrowLeft className='size-4' />
            Back to donors
          </Link>
        </Button>
      </div>
    );
  }

  const locationLabel = location
    ? [
        location.addressLine,
        location.village,
        location.city,
        location.division,
        location.postalCode,
        location.country,
      ]
        .filter(Boolean)
        .join(", ")
    : "Location not provided";

  const isRelatedDataLoading = isUserLoading || isLocationLoading;

  return (
    <div className='space-y-6 mx-auto py-4 w-full'>
      <Card className='py-0 overflow-hidden'>
        <div className='bg-primary h-2' />

        <div>
          <BackButton />
        </div>

        <CardContent className='p-5 sm:p-8'>
          <div className='flex sm:flex-row flex-col sm:items-start gap-6'>
            <Avatar className='border size-20 shrink-0'>
              <AvatarImage
                src={user?.image ?? undefined}
                alt={user?.name ?? "Blood donor"}
              />
              <AvatarFallback>
                {user?.name ? (
                  getInitials(user.name)
                ) : (
                  <UserRound className='size-8' />
                )}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-3 min-w-0'>
              <div>
                <Heading3>
                  {isRelatedDataLoading
                    ? "Loading donor..."
                    : (user?.name ?? "Blood donor")}
                </Heading3>

                <div className='flex items-start gap-2 mt-2 text-muted-foreground'>
                  <MapPin className='mt-0.5 size-4 shrink-0' />
                  <Muted>{locationLabel}</Muted>
                </div>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Badge className='gap-1.5 px-3 py-1.5 text-sm'>
                  <Droplets className='size-4' />
                  {formatBloodGroup(donor.bloodGroup)}
                </Badge>

                <Badge
                  variant={
                    donor.availability === "available" ? "default" : "secondary"
                  }
                  className='px-3 py-1.5'
                >
                  {getAvailabilityLabel(donor.availability)}
                </Badge>

                <Badge variant='outline' className='gap-1.5 px-3 py-1.5'>
                  {donor.isEligible ? (
                    <CheckCircle2 className='size-4 text-green-600' />
                  ) : (
                    <Clock3 className='size-4 text-muted-foreground' />
                  )}

                  {donor.isEligible
                    ? "Eligible to donate"
                    : "Eligibility unconfirmed"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator className='my-6' />

          <div className='gap-4 grid grid-cols-1 sm:grid-cols-3'>
            <div className='bg-muted/50 p-4 rounded-xl'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <HeartHandshake className='size-4' />
                <Muted>Total donations</Muted>
              </div>
              <p className='mt-2 font-semibold tabular-nums text-2xl'>
                {donor.totalDonations}
              </p>
            </div>

            <div className='bg-muted/50 p-4 rounded-xl'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <CalendarDays className='size-4' />
                <Muted>Last donation</Muted>
              </div>
              <p className='mt-2 font-semibold text-base'>
                {formatDate(donor.lastDonationAt)}
              </p>
            </div>

            <div className='bg-muted/50 p-4 rounded-xl'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <ShieldCheck className='size-4' />
                <Muted>Eligibility checked</Muted>
              </div>
              <p className='mt-2 font-semibold text-base'>
                {formatDate(donor.eligibilityCheckedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='gap-6 grid md:grid-cols-2'>
        <Card className='py-0'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Droplets className='size-5 text-primary' />
              Donor information
            </CardTitle>
          </CardHeader>

          <CardContent className='divide-y'>
            <DetailItem
              icon={Droplets}
              label='Blood group'
              value={formatBloodGroup(donor.bloodGroup)}
            />

            <DetailItem
              icon={ShieldCheck}
              label='Donation eligibility'
              value={donor.isEligible ? "Eligible" : "Not confirmed"}
            />

            <DetailItem
              icon={HeartHandshake}
              label='Total donations'
              value={String(donor.totalDonations)}
            />

            <DetailItem
              icon={CalendarDays}
              label='Donor since'
              value={formatDate(donor.createdAt)}
            />
          </CardContent>
        </Card>

        <Card className='py-0'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MapPin className='size-5 text-primary' />
              Location information
            </CardTitle>
          </CardHeader>

          <CardContent className='divide-y'>
            <DetailItem icon={MapPin} label='Address' value={locationLabel} />

            <DetailItem
              icon={MapPin}
              label='Village'
              value={location?.village || "Not provided"}
            />

            <DetailItem
              icon={MapPin}
              label='City'
              value={location?.city || "Not provided"}
            />

            <DetailItem
              icon={MapPin}
              label='Division'
              value={location?.division || "Not provided"}
            />
          </CardContent>
        </Card>
      </div>

      <p className='text-muted-foreground text-xs text-center'>
        Donor information was last updated on {formatDate(donor.updatedAt)}.
        Confirm availability before making donation arrangements.
      </p>
    </div>
  );
}
