import { type ReactTable, type RowData } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { TableFeatures } from "../components/table-features";

interface PaymentHistoryTableFilterProps<TData extends RowData> {
  table: ReactTable<TableFeatures, TData>;
}

export default function PaymentHistoryTableFilter<TData extends RowData>({
  table,
}: PaymentHistoryTableFilterProps<TData>) {
  return (
    <div className='w-full sm:w-auto'>
      <Input
        placeholder='Filter transactions...'
        value={
          (table
            .getColumn("stripePaymentIntentId")
            ?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table
            .getColumn("stripePaymentIntentId")
            ?.setFilterValue(event.target.value)
        }
        className='w-full sm:max-w-sm'
      />
    </div>
  );
}
