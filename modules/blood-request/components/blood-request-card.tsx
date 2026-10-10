import Link from "next/link";

import { CalendarClock, Droplets, HandHeart } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heading3, Muted, Small } from "@/components/typography/typography";
import type { BloodRequest } from "@/types/blood.request";
import { normalizeBloodGroup } from "@/utils/blood.group.normalize";

import { BloodRequestActions } from "./blood-request-actions";
import { BloodRequestPriorityBadge } from "./blood-request-priority-badge";
import { BloodRequestProgress } from "./blood-request-progress";
import { BloodRequestStatusBadge } from "./blood-request-status-badge";

interface BloodRequestCardProps {
  request: BloodRequest;
  onRespond?: (request: BloodRequest) => void;
  onEdit?: (request: BloodRequest) => void;
  onCancel?: (request: BloodRequest) => void;
  showManageActions?: boolean;
}

export function BloodRequestCard({
  request,
  onRespond,
  onEdit,
  onCancel,
  showManageActions = false,
}: BloodRequestCardProps) {
  const requiredAt = request.requiredAt ? new Date(request.requiredAt) : null;

  const formattedRequiredAt =
    requiredAt && !Number.isNaN(requiredAt.getTime())
      ? new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(requiredAt)
      : "Date not specified";

  return (
    <Card className='group flex flex-col gap-0 py-0 border-border/70 hover:border-brand/40 min-w-0 h-full overflow-hidden transition-colors'>
      <CardHeader className='gap-4 p-4 sm:p-5'>
        {/* Request heading */}
        <div className='flex items-start gap-3 min-w-0'>
          <div className='flex justify-center items-center bg-brand/5 border border-brand/15 rounded-xl sm:rounded-2xl size-12 sm:size-14 font-bold text-brand sm:text-xl shrink-0'>
            {normalizeBloodGroup(request.bloodGroup)}
          </div>

          <div className='flex-1 space-y-1 min-w-0'>
            <Link
              href={`/blood-requests/${request.id}`}
              className='block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-0 hover:text-brand transition-colors'
            >
              <Heading3 className='wrap-break-words line-clamp-2 leading-snug'>
                {request.patientName || "Blood needed"}
              </Heading3>
            </Link>

            <Muted className='text-sm'>
              {request.unitsRequired}{" "}
              {request.unitsRequired === 1 ? "unit" : "units"} required
            </Muted>
          </div>

          <div className='shrink-0'>
            <BloodRequestPriorityBadge priority={request.priority} />
          </div>
        </div>

        {/* Request status */}
        <div className='flex flex-wrap justify-between items-center gap-2 pt-3 border-border/60 border-t'>
          <BloodRequestStatusBadge status={request.status} />

          <Small className='text-muted-foreground'>
            Updated{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "medium",
            }).format(new Date(request.updatedAt))}
          </Small>
        </div>
      </CardHeader>

      <CardContent className='flex flex-col flex-1 gap-5 px-4 sm:px-5 pb-4 sm:pb-5'>
        {/* Request description */}
        {request.description ? (
          <p className='text-muted-foreground text-sm line-clamp-3 leading-6'>
            {request.description}
          </p>
        ) : (
          <p className='text-muted-foreground text-sm'>
            Help fulfill this blood request.
          </p>
        )}

        {/* Fulfillment progress */}
        <div className='space-y-3 bg-muted/20 p-3 sm:p-4 border border-border/60 rounded-xl'>
          <div className='flex items-center gap-2'>
            <div className='flex justify-center items-center bg-brand/10 rounded-lg size-8 text-brand shrink-0'>
              <Droplets className='size-4' />
            </div>

            <div className='flex-1 min-w-0'>
              <Small className='font-semibold'>Donation progress</Small>
              <Muted className='text-xs'>
                {request.unitsFulfilled} of {request.unitsRequired} units
                fulfilled
              </Muted>
            </div>
          </div>

          <BloodRequestProgress
            required={request.unitsRequired}
            fulfilled={request.unitsFulfilled}
          />
        </div>

        {/* Deadline */}
        <div className='flex items-start gap-3 min-w-0'>
          <div className='flex justify-center items-center bg-muted rounded-lg size-9 text-muted-foreground shrink-0'>
            <CalendarClock className='size-4' />
          </div>

          <div className='flex-1 space-y-1 min-w-0'>
            <Small className='font-semibold'>Required by</Small>
            <p className='text-sm wrap-break-words leading-5'>
              {formattedRequiredAt}
            </p>
          </div>
        </div>

        {/* Actions stay at the bottom of equal-height cards */}
        <div className='mt-auto pt-4 border-border/60 border-t'>
          <div className='flex items-center gap-2 mb-3'>
            <HandHeart className='size-4 text-brand' />
            <Small className='font-medium'>Make a difference</Small>
          </div>

          <BloodRequestActions
            request={request}
            onRespond={onRespond}
            onEdit={onEdit}
            onCancel={onCancel}
            showManageActions={showManageActions}
          />
        </div>
      </CardContent>
    </Card>
  );
}
