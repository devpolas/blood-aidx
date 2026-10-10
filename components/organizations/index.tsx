"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";

import { useOrganizations } from "@/hooks";
import { Heading3, Muted } from "../typography/typography";
import { OrganizationCard } from "@/modules/organization";
import { ListingPagination } from "../shared/pagination";
import { organizationFilters } from "@/modules/organization/organization-query";

import type { OrganizationQueryInput } from "@/validators/organization.validator";
import { ListingQueryFilters } from "../shared/query";
import { cleanListingQuery } from "@/utils/listing.query";

const DEFAULT_QUERY: OrganizationQueryInput = {
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export function OrganizationList() {
  const [query, setQuery] = useState<OrganizationQueryInput>(DEFAULT_QUERY);
  const { data: response, isLoading, isError } = useOrganizations(query);
  const organizations = response?.data?.organizations ?? [];

  return (
    <section className='space-y-6'>
      <ListingQueryFilters
        fields={organizationFilters}
        onApply={(values) =>
          setQuery({
            ...DEFAULT_QUERY,
            ...cleanListingQuery(values),
          } as OrganizationQueryInput)
        }
        onReset={() => setQuery(DEFAULT_QUERY)}
      />

      {isLoading ? (
        <div
          className='gap-4 grid sm:grid-cols-2 lg:grid-cols-3 py-4'
          aria-label='Loading organizations'
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className='bg-muted/40 border rounded-xl h-96 animate-pulse'
            />
          ))}
        </div>
      ) : isError ? (
        <p className='py-10 text-destructive text-sm text-center'>
          Failed to load organizations. Please try again.
        </p>
      ) : !organizations.length ? (
        <div className='px-6 py-12 border border-dashed rounded-xl text-center'>
          <Building2 className='mx-auto mb-3 size-8 text-muted-foreground' />
          <Heading3>No organizations found</Heading3>
          <Muted className='mt-2'>
            Try adjusting your search or filters, or check again later.
          </Muted>
        </div>
      ) : (
        <>
          <div className='gap-4 grid sm:grid-cols-2 lg:grid-cols-3 py-4'>
            {organizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
              />
            ))}
          </div>

          <ListingPagination
            page={Number(response?.meta?.page ?? query.page ?? 1)}
            totalPages={Number(response?.meta?.totalPage ?? 1)}
            total={Number(response?.meta?.total ?? 0)}
            onPageChange={(page) =>
              setQuery((current) => ({ ...current, page }))
            }
          />
        </>
      )}
    </section>
  );
}
