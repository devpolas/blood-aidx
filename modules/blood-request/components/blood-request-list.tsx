"use client";

import { Button } from "@/components/ui/button";
import { Heading2, Muted } from "@/components/typography/typography";
import type { BloodRequest } from "@/types/blood.request";

import { BloodRequestCard } from "./blood-request-card";

interface BloodRequestListProps {
  requests: BloodRequest[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function BloodRequestList({
  requests,
  isLoading = false,
  error,
  onRetry,
}: BloodRequestListProps) {
  if (isLoading) {
    return (
      <div
        className='gap-5 grid sm:grid-cols-2 lg:grid-cols-3 py-4'
        aria-label='Loading blood requests'
      >
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className='bg-muted/30 border rounded-xl h-64 animate-pulse'
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-10 border rounded-xl text-center'>
        <Heading2>Unable to load requests</Heading2>
        <Muted className='mt-2'>{error}</Muted>

        {onRetry && (
          <Button className='mt-4' variant='outline' onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className='py-10 border border-dashed rounded-xl text-center'>
        <Heading2>No blood requests found</Heading2>
        <Muted className='mt-2'>
          There are no blood requests to display right now.
        </Muted>
      </div>
    );
  }

  return (
    <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-4'>
      {requests.map((request) => (
        <BloodRequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}
