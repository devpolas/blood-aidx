import { Muted, Small } from "@/components/typography/typography";

interface BloodRequestProgressProps {
  required: number;
  fulfilled: number;
}

export function BloodRequestProgress({
  required,
  fulfilled,
}: BloodRequestProgressProps) {
  const safeRequired = Math.max(0, required);
  const safeFulfilled = Math.min(safeRequired, Math.max(0, fulfilled));

  const percentage =
    safeRequired > 0 ? Math.round((safeFulfilled / safeRequired) * 100) : 0;

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center gap-3'>
        <Small className='font-medium'>Donation progress</Small>
        <Muted>
          {safeFulfilled} of {safeRequired} units
        </Muted>
      </div>

      <div
        role='progressbar'
        aria-label='Blood request fulfillment'
        aria-valuemin={0}
        aria-valuemax={safeRequired}
        aria-valuenow={safeFulfilled}
        className='bg-muted rounded-full h-2 overflow-hidden'
      >
        <div
          className='bg-brand rounded-full h-full transition-[width]'
          style={{ width: `${percentage}%` }}
        />
      </div>

      <Muted>{percentage}% fulfilled</Muted>
    </div>
  );
}
