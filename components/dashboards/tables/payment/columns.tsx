import { createColumnHelper } from "@tanstack/react-table";
import { TableFeatures } from "../components/table-features";
import { Payment } from "@/types/payment";
import { Checkbox } from "@/components/ui/checkbox";
import { TableColumnHeader } from "../components/table-column-header";
import { dateFormat } from "@/utils/date.format";

const helper = createColumnHelper<TableFeatures, Payment>();

export const paymentColumns = helper.columns([
  helper.display({
    id: "select",

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        indeterminate={row.getIsSomeSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),

    enableSorting: false,
    enableHiding: false,
  }),

  helper.accessor("stripePaymentIntentId", {
    id: "stripePaymentIntentId",

    header: ({ column }) => (
      <TableColumnHeader column={column} title='Transaction ID' />
    ),

    cell: ({ getValue }) => (
      <span className='font-mono text-sm'>{getValue()}</span>
    ),
  }),

  helper.accessor("provider", {
    id: "provider",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Provider' />
    ),

    cell: ({ getValue }) => (
      <span className='font-mono text-sm'>{getValue()}</span>
    ),
  }),

  helper.accessor("amount", {
    id: "amount",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const { amount, currency } = row.original;
      return (
        <span className='font-medium'>
          {currency.toUpperCase()} {amount.toLocaleString()}
        </span>
      );
    },
  }),

  helper.accessor("paidAt", {
    id: "paidAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Paid At' />
    ),
    cell: ({ getValue }) => (
      <span className='font-mono text-sm'>{dateFormat(getValue())}</span>
    ),
  }),
]);
