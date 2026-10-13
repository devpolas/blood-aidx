"use client";
import Loading from "@/app/loading";
import { useMyPayments } from "@/hooks";
import PaymentTable from "./table";
import { paymentColumns } from "./columns";

export default function PaymentHistory() {
  const { data: paymentResponse, isLoading, isError, error } = useMyPayments();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !paymentResponse?.success) {
    return (
      <div className='flex justify-center items-center h-full min-h-[400px]'>
        <p className='text-muted-foreground'>
          {error instanceof Error
            ? error.message
            : (paymentResponse?.message ?? "Failed to load payment history.")}
        </p>
      </div>
    );
  }

  const paymentHistory = paymentResponse.data?.payments ?? [];

  if (paymentHistory.length === 0) {
    return (
      <div className='flex justify-center items-center h-full min-h-[400px]'>
        <div className='text-center'>
          <h2 className='font-semibold text-lg'>No payment history</h2>

          <p className='mt-1 text-muted-foreground text-sm'>
            You haven&apos;t payments yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4'>
      <PaymentTable data={paymentHistory} columns={paymentColumns} />
    </div>
  );
}
