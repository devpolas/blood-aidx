import { useCreateAtom } from "@tanstack/react-store";
import {
  type CellSelectionState,
  type ColumnDef,
  type PaginationState,
  type RowData,
  type SortingState,
  useTable,
} from "@tanstack/react-table";

import { dataTableFeatures, TableFeatures } from "../components/table-features";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "../components/table-pagination";
import PaymentHistoryTableToolbar from "./toolbar";

type TableTableProps<TData extends RowData> = {
  columns: ColumnDef<TableFeatures, TData>[];
  data: TData[];
};

export default function PaymentTable<TData extends RowData>({
  columns,
  data,
}: TableTableProps<TData>) {
  const cellSelectionAtom = useCreateAtom<CellSelectionState>([]);
  const sortingAtom = useCreateAtom<SortingState>([]);
  const globalFilterAtom = useCreateAtom<string>("");
  const paginationAtom = useCreateAtom<PaginationState>({
    pageIndex: 0, // initial page index
    pageSize: 15, // default page size
  });

  const table = useTable({
    data,
    columns,
    features: dataTableFeatures,
    atoms: {
      cellSelection: cellSelectionAtom,
      globalFilter: globalFilterAtom,
      pagination: paginationAtom,
      sorting: sortingAtom,
    },
  });

  return (
    <section className='overflow-hidden'>
      <div>
        <PaymentHistoryTableToolbar table={table} />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
              >
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </section>
  );
}
