"use client";

import { Heading2, Muted } from "@/components/typography/typography";
import { useBloodRequests } from "@/hooks";
import { BloodRequestCard } from "@/modules/blood-request/blood-request-card";

export function PublicBloodRequestList() {
  const { data: response, isLoading, isError } = useBloodRequests();

  const requests = response?.data?.requests ?? [];

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

  if (isError) {
    return (
      <p className='py-10 text-destructive text-sm text-center'>
        Failed to load requests. Please try again.
      </p>
    );
  }

  if (!requests.length) {
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
