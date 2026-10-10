"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { useLocation, useOrganization } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Heading3,
  Heading4,
  Muted,
  Small,
} from "@/components/typography/typography";

import type { Organization } from "@/types/organization";
import BackButton from "@/components/shared/back";

interface OrganizationDetailsProps {
  organizationId: string;
}

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(date: string | null | undefined) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  }).format(parsedDate);
}

function OrganizationDetailsLoading() {
  return (
    <div className='space-y-6 mx-auto py-4 w-full'>
      <div className='bg-muted rounded-lg w-36 h-9 animate-pulse' />

      <Card>
        <CardContent className='flex items-start gap-4 p-5 sm:p-8'>
          <div className='bg-muted rounded-2xl size-16 sm:size-20 animate-pulse shrink-0' />

          <div className='flex-1 space-y-3'>
            <div className='bg-muted rounded w-52 max-w-full h-6 animate-pulse' />
            <div className='bg-muted rounded w-36 h-4 animate-pulse' />
            <div className='bg-muted rounded-full w-28 h-6 animate-pulse' />
          </div>
        </CardContent>
      </Card>

      <div className='gap-6 grid md:grid-cols-2'>
        {[1, 2].map((item) => (
          <Card key={item}>
            <CardContent className='space-y-5 p-6'>
              <div className='bg-muted rounded w-40 h-5 animate-pulse' />
              {[1, 2, 3, 4].map((row) => (
                <div
                  key={row}
                  className='bg-muted/70 rounded-lg h-10 animate-pulse'
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
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className='flex items-start gap-3 py-3 min-w-0'>
      <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
        <Icon className='size-4' />
      </div>

      <div className='flex-1 space-y-1 min-w-0'>
        <Small className='text-muted-foreground'>{label}</Small>
        <p className='font-medium text-sm break-words leading-5'>{value}</p>
      </div>
    </div>
  );
}

function OrganizationDetailsContent({
  organization,
}: {
  organization: Organization;
}) {
  const { data: locationResponse, isLoading: isLocationLoading } = useLocation(
    organization.locationId ?? "",
  );

  const location = locationResponse?.data?.location;

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
    : isLocationLoading
      ? "Loading location..."
      : "Location not provided";

  const isVerified = organization.status === "verified";

  return (
    <div className='space-y-6'>
      <Card className='py-0 border-border/70 overflow-hidden'>
        <div className='bg-brand h-2' />
        <div>
          <BackButton />
        </div>

        <CardContent className='p-5 sm:p-8'>
          <div className='flex sm:flex-row flex-col sm:items-start gap-5'>
            <div className='flex justify-center items-center bg-brand/5 border border-brand/15 rounded-2xl size-16 sm:size-20 text-brand shrink-0'>
              <Building2 className='size-8 sm:size-10' />
            </div>

            <div className='flex-1 space-y-3 min-w-0'>
              <div>
                <Heading3 className='wrap-break-words leading-snug'>
                  {organization.name}
                </Heading3>

                <Muted className='mt-1'>{formatLabel(organization.type)}</Muted>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Badge
                  variant={isVerified ? "default" : "secondary"}
                  className='gap-1.5'
                >
                  {isVerified ? <ShieldCheck className='size-3.5' /> : null}
                  {formatLabel(organization.status)}
                </Badge>

                {isVerified && (
                  <Badge variant='outline' className='gap-1.5'>
                    <CheckCircle2 className='size-3.5 text-green-600' />
                    Verified organization
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {organization.description && (
            <>
              <div className='my-6 border-border/60 border-t' />

              <div className='space-y-2'>
                <Heading4>About this organization</Heading4>
                <p className='text-muted-foreground text-sm leading-7 whitespace-pre-line'>
                  {organization.description}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className='gap-6 grid md:grid-cols-2'>
        {/* Contact information */}
        <Card className='gap-0'>
          <CardHeader className='pb-2'>
            <Heading4 className='flex items-center gap-2'>
              <Phone className='size-5 text-brand' />
              Contact information
            </Heading4>
          </CardHeader>

          <CardContent className='divide-y divide-border/60'>
            <DetailItem
              icon={Phone}
              label='Phone number'
              value={organization.phone || "Not provided"}
            />

            <DetailItem
              icon={Mail}
              label='Email address'
              value={organization.email || "Not provided"}
            />

            <div className='flex items-start gap-3 py-3 min-w-0'>
              <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
                <Globe className='size-4' />
              </div>

              <div className='flex-1 space-y-1 min-w-0'>
                <Small className='text-muted-foreground'>Website</Small>

                {organization.website ? (
                  <a
                    href={organization.website}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='font-medium text-brand text-sm hover:underline underline-offset-4 break-all'
                  >
                    {organization.website}
                  </a>
                ) : (
                  <p className='font-medium text-sm'>Not provided</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location information */}
        <Card className='gap-0'>
          <CardHeader className='pb-2'>
            <Heading4 className='flex items-center gap-2'>
              <MapPin className='size-5 text-brand' />
              Location information
            </Heading4>
          </CardHeader>

          <CardContent className='divide-y divide-border/60'>
            <DetailItem
              icon={MapPin}
              label='Full address'
              value={locationLabel}
            />

            <DetailItem
              icon={MapPin}
              label='Village / settlement'
              value={location?.village || "Not provided"}
            />

            <DetailItem
              icon={MapPin}
              label='City'
              value={location?.city || "Not provided"}
            />

            <DetailItem
              icon={MapPin}
              label='Division / region'
              value={location?.division || "Not provided"}
            />
          </CardContent>
        </Card>

        {/* Organization record */}
        <Card className='gap-0 md:col-span-2'>
          <CardHeader className='pb-2'>
            <Heading4 className='flex items-center gap-2'>
              <CalendarDays className='size-5 text-brand' />
              Organization record
            </Heading4>
          </CardHeader>

          <CardContent className='gap-x-8 grid sm:grid-cols-2 divide-y sm:divide-y-0 divide-border/60'>
            <DetailItem
              icon={CalendarDays}
              label='Registered on'
              value={formatDate(organization.createdAt)}
            />

            <DetailItem
              icon={CalendarDays}
              label='Last updated'
              value={formatDate(organization.updatedAt)}
            />

            <DetailItem
              icon={ShieldCheck}
              label='Verification date'
              value={formatDate(organization.verifiedAt)}
            />
          </CardContent>
        </Card>
      </div>

      <p className='text-muted-foreground text-xs text-center leading-5'>
        Contact the organization directly to confirm its current services,
        availability, and contact details.
      </p>
    </div>
  );
}

export function OrganizationDetails({
  organizationId,
}: OrganizationDetailsProps) {
  const {
    data: response,
    isLoading,
    isError,
  } = useOrganization(organizationId);

  const organization = response?.data?.organization;

  if (isLoading) {
    return <OrganizationDetailsLoading />;
  }

  if (isError || !organization) {
    return (
      <div className='flex flex-col justify-center items-center gap-3 min-h-80 text-center'>
        <div className='flex justify-center items-center bg-brand/10 rounded-full size-14 text-brand'>
          <Building2 className='size-6' />
        </div>

        <Heading3>Organization not found</Heading3>

        <Muted>
          This organization may have been removed or is currently unavailable.
        </Muted>

        <BackButton />
      </div>
    );
  }

  return (
    <div className='space-y-6 mx-auto py-4 w-full'>
      <OrganizationDetailsContent organization={organization} />
    </div>
  );
}
