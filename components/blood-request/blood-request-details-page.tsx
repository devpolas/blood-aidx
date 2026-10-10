"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading2, Muted } from "@/components/typography/typography";
import { useAuth, useBloodRequest } from "@/hooks";
import { BloodRequestDetails } from "@/modules/blood-request/components/blood-request-details";
import { BloodRequestDetailsSkeleton } from "./blood-request-details-skeleton";

interface BloodRequestDetailsPageProps {
  id: string;
}

export function BloodRequestDetailsPage({ id }: BloodRequestDetailsPageProps) {
  const { data, isPending, isError, refetch } = useBloodRequest(id);
  const { user, isLoading } = useAuth();

  const request = data?.data?.request;

  if (isPending || isLoading) {
    return (
      <div className='mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full max-w-6xl'>
        <BloodRequestDetailsSkeleton />
      </div>
    );
  }

  if (isError || !request) {
    return (
      <section className='mx-auto px-4 py-8 w-full'>
        <Heading2>Blood request not found</Heading2>

        <Muted className='mt-2'>
          This request may have been removed or is temporarily unavailable.
        </Muted>

        <div className='flex flex-wrap gap-3 mt-4'>
          <Button variant='outline' onClick={() => void refetch()}>
            Try again
          </Button>

          <Button>
            <Link href='/blood-requests'>All blood requests</Link>
          </Button>
        </div>
      </section>
    );
  }

  const showManageActions = request?.requesterId === user?.id;

  return (
    <section className='mx-auto px-4 py-8 w-full'>
      <BloodRequestDetails
        request={request}
        showManageActions={showManageActions}
      />
    </section>
  );
}
