import { ReactTable, RowData } from "@tanstack/react-table";
import { TableFeatures } from "../components/table-features";
import PaymentHistoryTableFilter from "./filter";
import { TableViewOptions } from "../components/table-column-toggle";

interface PaymentHistoryTableToolbarProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PaymentHistoryTableToolbar<TData extends RowData>({
  table,
}: PaymentHistoryTableToolbarProps<TData>) {
  return (
    <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-brand-surface p-2 rounded'>
      <PaymentHistoryTableFilter table={table} />

      <div className='flex justify-end'>
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
