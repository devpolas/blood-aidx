"use client";
import { useOrganizations } from "@/hooks";
import { Building2 } from "lucide-react";
import { Heading3, Muted } from "../typography/typography";
import { OrganizationCard } from "@/modules/organization";

export function OrganizationList() {
  const { data: response, isLoading, isError } = useOrganizations();

  const organizations = response?.data?.organizations ?? [];

  if (isLoading) {
    return (
      <div className='gap-4 grid sm:grid-cols-2 lg:grid-cols-3 py-4'>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className='bg-muted/40 border rounded-xl h-96 animate-pulse'
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className='py-10 text-destructive text-sm text-center'>
        Failed to load organizations. Please try again.
      </p>
    );
  }

  if (!organizations.length) {
    return (
      <div className='px-6 py-12 border border-dashed rounded-xl text-center'>
        <Building2 className='mx-auto mb-3 size-8 text-muted-foreground' />
        <Heading3>No organizations found</Heading3>
        <Muted className='mt-2'>Please check again later.</Muted>
      </div>
    );
  }

  return (
    <div className='gap-4 grid sm:grid-cols-2 lg:grid-cols-3 py-4'>
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </div>
  );
}
