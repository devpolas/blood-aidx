"use client";

import {
  ArrowRight,
  Building2,
  CalendarClock,
  Edit2,
  ExternalLink,
  Globe,
  HandHelping,
  Info,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";

import BackButton from "@/components/shared/back";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Heading2,
  Heading3,
  Heading5,
  Muted,
  Small,
} from "@/components/typography/typography";
import {
  useIsMobile,
  useLocation,
  useOrganization,
  useUserById,
} from "@/hooks";
import type { BloodRequest } from "@/types/blood.request";
import { normalizeBloodGroup } from "@/utils/blood.group.normalize";

import { BloodRequestPriorityBadge } from "./blood-request-priority-badge";
import { BloodRequestProgress } from "./blood-request-progress";
import { BloodRequestStatusBadge } from "./blood-request-status-badge";

import type { ComponentType, ReactNode } from "react";
import { LoadingSpinner } from "@/components/shared/loading/loading";

interface BloodRequestDetailsProps {
  request: BloodRequest;
  onRespond?: (request: BloodRequest) => void;
  onEdit?: (request: BloodRequest) => void;
  onCancel?: (request: BloodRequest) => void;
  showManageActions?: boolean;
  isCancelPending?: boolean;
}

function formatDate(value: string | null) {
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not specified";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
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

function getWebsiteUrl(website: string) {
  try {
    const url = new URL(
      /^https?:\/\//i.test(website) ? website : `https://${website}`,
    );

    if (!["http:", "https:"].includes(url.protocol)) return null;

    return url.href;
  } catch {
    return null;
  }
}

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Card className='gap-0 py-0 border-border/70 min-w-0 overflow-hidden'>
      <CardHeader className='gap-1 p-4 sm:p-5'>
        <div className='flex items-start gap-3 min-w-0'>
          <div className='flex justify-center items-center bg-primary/10 rounded-xl size-10 shrink-0'>
            <Icon className='size-5 text-primary' />
          </div>

          <div className='flex-1 space-y-0.5 min-w-0'>
            <Heading5 className='leading-6'>{title}</Heading5>
            {description && <Muted>{description}</Muted>}
          </div>
        </div>
      </CardHeader>

      <CardContent className='px-4 sm:px-5 pb-4 sm:pb-5 min-w-0'>
        {children}
      </CardContent>
    </Card>
  );
}

function LoadingPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden='true'
      className={`animate-pulse rounded-lg bg-muted ${className}`}
    />
  );
}

export function BloodRequestDetails({
  request,
  onRespond,
  onEdit,
  onCancel,
  showManageActions = false,
  isCancelPending = false,
}: BloodRequestDetailsProps) {
  const isMobile = useIsMobile();
  const { data: requesterResponse, isPending: isRequesterPending } =
    useUserById(request.requesterId);

  const { data: organizationResponse, isPending: isOrganizationPending } =
    useOrganization(request.organizationId);

  const requester = requesterResponse?.data?.user;
  const organization = organizationResponse?.data?.organization;

  const { data: locationResponse, isPending: isLocationPending } = useLocation(
    organization?.locationId ?? "",
  );

  const location = locationResponse?.data?.location;

  const locationAddress = location
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
    : "";

  const latitude = location?.latitude;
  const longitude = location?.longitude;

  const mapUrl =
    latitude != null && longitude != null
      ? `https://www.google.com/maps?q=${encodeURIComponent(
          `${latitude},${longitude}`,
        )}`
      : null;

  const websiteUrl = organization?.website
    ? getWebsiteUrl(organization.website)
    : null;

  return (
    <div className='flex flex-col gap-5 sm:gap-6 mx-auto w-full min-w-0'>
      {/* Request summary */}
      <Card className='gap-0 py-0 border-brand/20 min-w-0 overflow-hidden'>
        <div className='bg-brand h-1.5' />

        {/* Header actions */}
        <div className='flex justify-between items-center gap-2 px-4 sm:px-6 py-3 w-full'>
          <BackButton />

          {showManageActions && (
            <div className='flex flex-wrap justify-end items-center gap-2'>
              {onEdit && (
                <Button
                  type='button'
                  variant='outline'
                  className='gap-2 text-xs sm:text-sm'
                  size={isMobile ? "xs" : "sm"}
                  onClick={() => onEdit(request)}
                >
                  <Edit2 className='size-4 text-brand' />
                  <span>Edit</span>
                </Button>
              )}

              {onCancel && (
                <Button
                  type='button'
                  variant='destructive'
                  size={isMobile ? "xs" : "sm"}
                  disabled={isCancelPending}
                  onClick={() => onCancel?.(request)}
                >
                  {isCancelPending ? (
                    <LoadingSpinner
                      shimmer
                      text='Cancelling request...'
                      spinnerClassName='text-brand'
                      textClassName='text-brand'
                    />
                  ) : (
                    "Cancel request"
                  )}
                </Button>
              )}
            </div>
          )}
        </div>

        <CardHeader className='gap-5 px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-8'>
          {/* Status and request ID */}
          <div className='flex flex-wrap justify-between items-center gap-2'>
            <div className='flex flex-wrap items-center gap-2'>
              <BloodRequestStatusBadge status={request.status} />
              <BloodRequestPriorityBadge priority={request.priority} />
            </div>

            <Small className='text-muted-foreground break-all'>
              Request #{request.id.slice(0, 8)}
            </Small>
          </div>

          {/* Blood group and patient information */}
          <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 min-w-0'>
            <div className='flex sm:flex-row flex-col sm:items-center gap-4 min-w-0'>
              <div className='flex justify-center items-center bg-brand/5 border border-brand/15 rounded-2xl size-16 sm:size-20 font-bold text-brand shrink-0'>
                <span className='text-lg sm:text-2xl text-center'>
                  {normalizeBloodGroup(request.bloodGroup)}
                </span>
              </div>

              <div className='flex-1 space-y-2 min-w-0'>
                <Heading2 className='break-words leading-tight'>
                  {request.patientName || "Blood donation needed"}
                </Heading2>

                <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                  <Muted>
                    {request.unitsRequired}{" "}
                    {request.unitsRequired === 1 ? "unit" : "units"} required
                  </Muted>

                  {request.patientAge != null && (
                    <Muted>Patient age: {request.patientAge}</Muted>
                  )}
                </div>
              </div>
            </div>

            {!showManageActions && onRespond && (
              <Button
                type='button'
                className='gap-2 w-full sm:w-auto shrink-0'
                size={isMobile ? "sm" : "default"}
                onClick={() => onRespond(request)}
              >
                <HandHelping className='size-4 shrink-0' />
                <span>Respond to request</span>
                <ArrowRight className='size-4 shrink-0' />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className='space-y-5 px-4 sm:px-6 pb-5 sm:pb-6 min-w-0'>
          {/* Donation progress */}
          <div className='bg-muted/20 p-3 sm:p-4 border border-border/60 rounded-xl'>
            <div className='flex flex-wrap justify-between items-center gap-2 mb-4'>
              <Heading3>Donation progress</Heading3>

              <Small className='text-muted-foreground'>
                {request.unitsFulfilled} of {request.unitsRequired} units
                fulfilled
              </Small>
            </div>

            <BloodRequestProgress
              required={request.unitsRequired}
              fulfilled={request.unitsFulfilled}
            />
          </div>

          {/* Request description */}
          {request.description && (
            <div className='space-y-2 pt-4 border-border/60 border-t'>
              <Heading3>Description</Heading3>

              <p className='text-muted-foreground text-sm break-words leading-7 whitespace-pre-line'>
                {request.description}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requester and organization */}
      <div className='items-stretch gap-5 grid grid-cols-1 lg:grid-cols-2 min-w-0'>
        <SectionCard
          icon={HandHelping}
          title='Requester'
          description='Person who created this blood request'
        >
          {isRequesterPending ? (
            <div className='flex items-center gap-3'>
              <LoadingPlaceholder className='rounded-full size-12 shrink-0' />

              <div className='flex-1 space-y-2 min-w-0'>
                <LoadingPlaceholder className='w-32 max-w-full h-4' />
                <LoadingPlaceholder className='w-48 max-w-full h-3' />
              </div>
            </div>
          ) : requester ? (
            <div className='flex items-center gap-3 min-w-0'>
              {requester.image ? (
                <img
                  src={requester.image}
                  alt={`${requester.name}'s profile`}
                  className='border rounded-full size-12 object-cover shrink-0'
                />
              ) : (
                <div className='flex justify-center items-center bg-brand/10 rounded-full size-12 font-semibold text-brand shrink-0'>
                  {getInitials(requester.name)}
                </div>
              )}

              <div className='flex-1 space-y-1 min-w-0'>
                <p className='font-medium break-words'>{requester.name}</p>
                <p className='text-muted-foreground text-sm break-all'>
                  {requester.email}
                </p>
              </div>
            </div>
          ) : (
            <Muted>Requester information is unavailable.</Muted>
          )}
        </SectionCard>

        <SectionCard
          icon={Building2}
          title='Organization'
          description='Hospital or blood bank associated with this request'
        >
          {isOrganizationPending ? (
            <div className='space-y-3'>
              <LoadingPlaceholder className='w-40 max-w-full h-4' />
              <LoadingPlaceholder className='w-24 max-w-full h-3' />
              <LoadingPlaceholder className='w-48 max-w-full h-3' />
            </div>
          ) : organization ? (
            <div className='flex flex-col gap-3 min-w-0'>
              <div className='space-y-1 min-w-0'>
                <p className='font-semibold break-words'>{organization.name}</p>

                <Small className='capitalize'>
                  {organization.type.replaceAll("_", " ")}
                </Small>
              </div>

              {organization.phone && (
                <a
                  href={`tel:${organization.phone}`}
                  className='flex items-start gap-2 min-w-0 text-muted-foreground hover:text-foreground text-sm'
                >
                  <Phone className='mt-0.5 size-4 shrink-0' />
                  <span className='break-all'>{organization.phone}</span>
                </a>
              )}

              {organization.email && (
                <a
                  href={`mailto:${organization.email}`}
                  className='flex items-start gap-2 min-w-0 text-muted-foreground hover:text-foreground text-sm'
                >
                  <UserRound className='mt-0.5 size-4 shrink-0' />
                  <span className='break-all'>{organization.email}</span>
                </a>
              )}

              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 w-fit max-w-full text-brand text-sm hover:underline'
                >
                  <Globe className='size-4 shrink-0' />
                  <span className='break-all'>Organization website</span>
                  <ExternalLink className='size-3.5 shrink-0' />
                </a>
              )}
            </div>
          ) : (
            <Muted>Organization information is unavailable.</Muted>
          )}
        </SectionCard>
      </div>

      {/* Donation location */}
      <SectionCard
        icon={MapPin}
        title='Donation location'
        description='Location associated with the organization'
      >
        {isOrganizationPending || isLocationPending ? (
          <div className='space-y-3'>
            <LoadingPlaceholder className='w-56 max-w-full h-4' />
            <LoadingPlaceholder className='w-40 max-w-full h-4' />
            <LoadingPlaceholder className='w-36 max-w-full h-9' />
          </div>
        ) : !organization?.locationId ? (
          <Muted>This organization has no location assigned.</Muted>
        ) : location ? (
          <div className='flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4 min-w-0'>
            <div className='flex items-start gap-3 min-w-0'>
              <div className='flex justify-center items-center bg-brand/10 rounded-xl size-10 text-brand shrink-0'>
                <MapPin className='size-5' />
              </div>

              <p className='min-w-0 text-sm break-words leading-7'>
                {locationAddress || "No address information available."}
              </p>
            </div>

            {mapUrl && (
              <Button
                type='button'
                variant='outline'
                className='gap-2 w-full sm:w-auto shrink-0'
                onClick={() =>
                  window.open(mapUrl, "_blank", "noopener,noreferrer")
                }
              >
                <MapPin className='size-4 shrink-0' />
                <span>View on Maps</span>
                <ExternalLink className='size-3.5 shrink-0' />
              </Button>
            )}
          </div>
        ) : (
          <Muted>Location information is unavailable.</Muted>
        )}
      </SectionCard>

      {/* Request dates */}
      <SectionCard
        icon={Info}
        title='Request information'
        description='Review the important dates and timeline associated with this blood request.'
      >
        <dl className='gap-x-6 gap-y-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 min-w-0'>
          {[
            { label: "Required by", value: formatDate(request.requiredAt) },
            { label: "Request expires", value: formatDate(request.expiresAt) },
            { label: "Created at", value: formatDate(request.createdAt) },
            { label: "Last updated", value: formatDate(request.updatedAt) },
          ].map(({ label, value }) => (
            <div key={label} className='space-y-1 min-w-0'>
              <dt className='text-muted-foreground text-sm'>{label}</dt>

              <dd className='flex items-start gap-2 min-w-0 font-medium text-sm break-words leading-6'>
                <CalendarClock className='mt-1 size-4 text-muted-foreground shrink-0' />
                <span>{value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </SectionCard>
    </div>
  );
}
