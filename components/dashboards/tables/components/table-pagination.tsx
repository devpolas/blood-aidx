import { type ReactTable, type RowData } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableFeatures } from "./table-features";

interface TablePaginationProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export function TablePagination<TData extends RowData>({
  table,
}: TablePaginationProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const totalRows = table.getFilteredRowModel().rows.length;
  const page = table.state.pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  return (
    <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 bg-brand-surface p-2 rounded'>
      <div className='text-muted-foreground text-sm'>
        {selectedRows} of {totalRows} row(s) selected.
      </div>

      <div className='flex justify-between sm:justify-end items-center gap-3'>
        <div className='flex items-center gap-2'>
          <p className='hidden sm:block font-medium text-sm'>Rows per page</p>

          <Select
            value={`${table.state.pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='w-[60px] sm:w-[70px] h-8'>
              <SelectValue />
            </SelectTrigger>

            <SelectContent side='top'>
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='font-medium text-sm text-center whitespace-nowrap'>
          {page} / {pageCount}
        </div>

        <div className='flex items-center gap-1'>
          <Button
            variant='outline'
            size='icon'
            className='hidden lg:flex size-8'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft />
          </Button>

          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeft />
          </Button>

          <Button
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRight />
          </Button>

          <Button
            variant='outline'
            size='icon'
            className='hidden lg:flex size-8'
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
