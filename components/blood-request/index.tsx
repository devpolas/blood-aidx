"use client";

import { useState } from "react";

import { Heading2, Muted } from "@/components/typography/typography";
import { useBloodRequests } from "@/hooks";
import { BloodRequestCard } from "@/modules/blood-request/blood-request-card";
import { ListingPagination } from "../shared/pagination";
import { bloodRequestFilters } from "@/modules/blood-request/blood-request-query";
import type { BloodRequestQuery } from "@/validators/blood.request.validator";
import { ListingQueryFilters } from "../shared/query";
import { cleanListingQuery } from "@/utils/listing.query";

const DEFAULT_QUERY: BloodRequestQuery = {
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export function PublicBloodRequestList() {
  const [query, setQuery] = useState<BloodRequestQuery>(DEFAULT_QUERY);
  const { data: response, isLoading, isError } = useBloodRequests(query);
  const requests = response?.data?.requests ?? [];

  return (
    <section className='space-y-6'>
      <ListingQueryFilters
        fields={bloodRequestFilters}
        onApply={(values) =>
          setQuery({
            ...DEFAULT_QUERY,
            ...cleanListingQuery(values),
          } as BloodRequestQuery)
        }
        onReset={() => setQuery(DEFAULT_QUERY)}
      />

      {isLoading ? (
        <div
          className='gap-5 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-4'
          aria-label='Loading blood requests'
        >
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className='bg-muted/30 border rounded-xl h-64 animate-pulse'
            />
          ))}
        </div>
      ) : isError ? (
        <p className='py-10 text-destructive text-sm text-center'>
          Failed to load requests. Please try again.
        </p>
      ) : !requests.length ? (
        <div className='py-10 border border-dashed rounded-xl text-center'>
          <Heading2>No blood requests found</Heading2>
          <Muted className='mt-2'>Try changing your search or filters.</Muted>
        </div>
      ) : (
        <>
          <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 py-4'>
            {requests.map((request) => (
              <BloodRequestCard key={request.id} request={request} />
            ))}
          </div>

          <ListingPagination
            page={response?.meta?.page ?? query.page ?? 1}
            totalPages={response?.meta?.totalPage ?? 1}
            total={response?.meta?.total ?? 0}
            onPageChange={(page) =>
              setQuery((current) => ({ ...current, page }))
            }
          />
        </>
      )}
    </section>
  );
}
