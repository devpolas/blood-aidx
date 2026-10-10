"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ListingPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function ListingPagination({
  page,
  totalPages,
  total,
  onPageChange,
}: ListingPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label='Pagination'
      className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 pt-5 border-t'
    >
      <p className='text-muted-foreground text-sm'>
        Page <span className='font-medium text-foreground'>{page}</span> of{" "}
        <span className='font-medium text-foreground'>{totalPages}</span>
        <span className='mx-1.5'>·</span>
        {total} results
      </p>

      <div className='flex items-center gap-2'>
        <button
          type='button'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className='inline-flex items-center gap-1 hover:bg-muted disabled:opacity-40 px-3 border border-border rounded-xl h-10 font-medium text-sm transition disabled:pointer-events-none'
        >
          <ChevronLeft className='size-4' />
          Previous
        </button>

        <button
          type='button'
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className='inline-flex items-center gap-1 hover:bg-muted disabled:opacity-40 px-3 border border-border rounded-xl h-10 font-medium text-sm transition disabled:pointer-events-none'
        >
          Next
          <ChevronRight className='size-4' />
        </button>
      </div>
    </nav>
  );
}
