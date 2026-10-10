"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading2, Muted } from "@/components/typography/typography";
import { useAuth, useBloodRequest } from "@/hooks";
import { BloodRequestDetails } from "@/modules/blood-request/components/blood-request-details";

interface BloodRequestDetailsPageProps {
  id: string;
}

export function BloodRequestDetailsPage({ id }: BloodRequestDetailsPageProps) {
  const { data, isPending, isError, refetch } = useBloodRequest(id);
  const { user, isLoading } = useAuth();

  const request = data?.data?.request;

  if (isPending || isLoading) {
    return (
      <main className='mx-auto px-4 py-8 w-full'>
        <div className='bg-muted rounded w-56 h-8 animate-pulse' />
        <div className='bg-muted/50 mt-6 rounded-xl h-64 animate-pulse' />
      </main>
    );
  }

  if (isError || !request) {
    return (
      <main className='mx-auto px-4 py-8 w-full'>
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
      </main>
    );
  }

  const showManageActions = request?.requesterId === user?.id;

  return (
    <main className='mx-auto px-4 py-8 w-full'>
      <BloodRequestDetails
        request={request}
        showManageActions={showManageActions}
      />
    </main>
  );
}
