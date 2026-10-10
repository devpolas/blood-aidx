"use client";
import { Droplets } from "lucide-react";
import { Heading4, Muted } from "../typography/typography";
import { DonorCard } from "@/modules/donors";
import { useDonors } from "@/hooks";

export function DonorList() {
  const { data: response, isLoading, isError } = useDonors();

  const donors = response?.data?.donors ?? [];

  if (isLoading) {
    return (
      <div className='gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div
            key={item}
            className='bg-muted/40 border rounded-xl h-64 animate-pulse'
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className='py-10 text-destructive text-sm text-center'>
        Failed to load donors. Please try again.
      </p>
    );
  }

  if (!donors.length) {
    return (
      <div className='px-10 border border-dashed rounded-xl text-center'>
        <Droplets className='mx-auto mb-3 size-8 text-muted-foreground' />
        <Heading4>No donors found</Heading4>
        <Muted className='mt-2'>
          Try adjusting your filters or check again later.
        </Muted>
      </div>
    );
  }

  return (
    <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4'>
      {donors.map((donor) => (
        <DonorCard key={donor.id} donor={donor} />
      ))}
    </div>
  );
}
