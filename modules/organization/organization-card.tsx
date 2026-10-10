import Link from "next/link";

import {
  Building2,
  CalendarDays,
  Eye,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading3, Muted, Small } from "@/components/typography/typography";

import type { Organization } from "@/types/organization";
import { useLocation } from "@/hooks";

interface OrganizationCardProps {
  organization: Organization;
}

function formatLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently updated";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(parsedDate);
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const { data: locationResponse, isLoading: isLocationLoading } = useLocation(
    organization.locationId ?? "",
  );

  const location = locationResponse?.data?.location;

  const locationLabel = location
    ? [location.city, location.division, location.country]
        .filter(Boolean)
        .join(", ")
    : isLocationLoading
      ? "Loading location..."
      : "Location not provided";

  const isVerified = organization.status === "verified";
  const detailsHref = `/find-organizations/${organization.id}`;

  return (
    <Card className='group flex flex-col gap-0 py-0 border-border/70 hover:border-brand/40 min-w-0 h-full overflow-hidden transition-colors'>
      <CardHeader className='gap-4 p-4 sm:p-5'>
        {/* Organization heading */}
        <div className='flex items-start gap-3 min-w-0'>
          <div className='flex justify-center items-center bg-brand/5 border border-brand/15 rounded-xl sm:rounded-2xl size-12 sm:size-14 text-brand shrink-0'>
            <Building2 className='size-6 sm:size-7' />
          </div>

          <div className='flex-1 space-y-1 min-w-0'>
            <Link
              href={detailsHref}
              className='block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-0 hover:text-brand transition-colors'
            >
              <Heading3 className='wrap-break-words line-clamp-2 leading-snug'>
                {organization.name}
              </Heading3>
            </Link>

            <Muted className='text-sm'>{formatLabel(organization.type)}</Muted>
          </div>
        </div>

        {/* Organization status */}
        <div className='flex flex-wrap justify-between items-center gap-2 pt-3 border-border/60 border-t'>
          <Badge
            variant={isVerified ? "default" : "secondary"}
            className='gap-1.5'
          >
            {isVerified && <ShieldCheck className='size-3.5' />}
            {formatLabel(organization.status)}
          </Badge>

          <Small className='text-muted-foreground'>
            Updated {formatDate(organization.updatedAt)}
          </Small>
        </div>
      </CardHeader>

      <CardContent className='flex flex-col flex-1 gap-5 px-4 sm:px-5 pb-5'>
        {/* Description */}
        <p className='min-h-18 text-muted-foreground text-sm line-clamp-3 leading-6'>
          {organization.description ||
            "Learn more about this organization and its services."}
        </p>

        {/* Organization information */}
        <div className='space-y-4'>
          <div className='flex items-start gap-3 min-w-0'>
            <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
              <MapPin className='size-4' />
            </div>

            <div className='flex-1 space-y-1 min-w-0'>
              <Small className='font-semibold'>Location</Small>
              <p className='text-sm wrap-break-words leading-5'>
                {locationLabel}
              </p>
            </div>
          </div>

          {organization.phone && (
            <div className='flex items-start gap-3 min-w-0'>
              <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
                <Phone className='size-4' />
              </div>

              <div className='flex-1 space-y-1 min-w-0'>
                <Small className='font-semibold'>Phone</Small>
                <p className='text-sm break-all leading-5'>
                  {organization.phone}
                </p>
              </div>
            </div>
          )}

          {organization.email && (
            <div className='flex items-start gap-3 min-w-0'>
              <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
                <Mail className='size-4' />
              </div>

              <div className='flex-1 space-y-1 min-w-0'>
                <Small className='font-semibold'>Email</Small>
                <p className='text-sm break-all leading-5'>
                  {organization.email}
                </p>
              </div>
            </div>
          )}

          {organization.website && (
            <div className='flex items-start gap-3 min-w-0'>
              <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
                <Globe className='size-4' />
              </div>

              <div className='flex-1 space-y-1 min-w-0'>
                <Small className='font-semibold'>Website</Small>
                <p className='text-brand text-sm break-all leading-5'>
                  {organization.website}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='space-y-3 mt-auto pt-4 border-border/60 border-t'>
          <div className='flex items-center gap-2'>
            <CalendarDays className='size-4 text-brand shrink-0' />
            <Small className='font-medium'>
              Registered {formatDate(organization.createdAt)}
            </Small>
          </div>

          <Button
            variant='destructive'
            className='w-full'
            render={
              <Link
                className='flex flex-row items-center gap-1'
                href={detailsHref}
              >
                <Eye className='size-4 text-brand' />
                View organization
              </Link>
            }
          ></Button>
        </div>
      </CardContent>
    </Card>
  );
}
