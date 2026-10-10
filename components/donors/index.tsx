"use client";

import { useState } from "react";
import { Droplets } from "lucide-react";

import { Heading4, Muted } from "../typography/typography";
import { DonorCard } from "@/modules/donors";
import { useDonors } from "@/hooks";
import { ListingPagination } from "../shared/pagination";
import { donorFilters } from "@/modules/donors/donor-query";

import type { DonorQuery } from "@/validators/donor.validator";
import { ListingQueryFilters } from "../shared/query";
import { cleanListingQuery } from "@/utils/listing.query";

const DEFAULT_QUERY: DonorQuery = {
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export function DonorList() {
  const [query, setQuery] = useState<DonorQuery>(DEFAULT_QUERY);
  const { data: response, isLoading, isError } = useDonors(query);
  const donors = response?.data?.donors ?? [];

  return (
    <section className='space-y-6'>
      <ListingQueryFilters
        fields={donorFilters}
        onApply={(values) =>
          setQuery({
            ...DEFAULT_QUERY,
            ...cleanListingQuery(values),
          } as DonorQuery)
        }
        onReset={() => setQuery(DEFAULT_QUERY)}
      />

      {isLoading ? (
        <div
          className='gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4'
          aria-label='Loading donors'
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={index}
              className='bg-muted/40 border rounded-xl h-64 animate-pulse'
            />
          ))}
        </div>
      ) : isError ? (
        <p className='py-10 text-destructive text-sm text-center'>
          Failed to load donors. Please try again.
        </p>
      ) : !donors.length ? (
        <div className='px-6 py-10 border border-dashed rounded-xl text-center'>
          <Droplets className='mx-auto mb-3 size-8 text-muted-foreground' />
          <Heading4>No donors found</Heading4>
          <Muted className='mt-2'>
            Try adjusting your filters or check again later.
          </Muted>
        </div>
      ) : (
        <>
          <div className='gap-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4'>
            {donors.map((donor) => (
              <DonorCard key={donor.id} donor={donor} />
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
