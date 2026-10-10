import { Card, CardContent, CardHeader } from "@/components/ui/card";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden='true'
      className={`animate-pulse rounded-lg bg-muted ${className}`}
    />
  );
}

function SectionSkeleton({
  titleWidth = "w-36",
  descriptionWidth = "w-56",
  children,
}: {
  titleWidth?: string;
  descriptionWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className='gap-0 py-0 border-border/70 min-w-0 overflow-hidden'>
      <CardHeader className='gap-2 p-4 sm:p-5'>
        <Skeleton className={`h-5 max-w-full ${titleWidth}`} />
        <Skeleton className={`h-3.5 max-w-full ${descriptionWidth}`} />
      </CardHeader>

      <CardContent className='px-4 sm:px-5 pb-4 sm:pb-5 min-w-0'>
        {children}
      </CardContent>
    </Card>
  );
}

function RequesterSkeleton() {
  return (
    <div className='flex items-center gap-3 min-w-0'>
      <Skeleton className='rounded-full size-12 shrink-0' />

      <div className='flex-1 space-y-2 min-w-0'>
        <Skeleton className='w-36 max-w-full h-4' />
        <Skeleton className='w-48 max-w-full h-3.5' />
      </div>
    </div>
  );
}

export function BloodRequestDetailsSkeleton() {
  return (
    <div
      role='status'
      aria-label='Loading blood request details'
      className='flex flex-col gap-5 sm:gap-6 mx-auto w-full min-w-0'
    >
      <span className='sr-only'>Loading blood request details...</span>

      {/* Request summary */}
      <Card className='gap-0 py-0 border-brand/20 min-w-0 overflow-hidden'>
        <div className='bg-brand/40 h-1.5' />

        <CardHeader className='gap-5 p-4 sm:p-6'>
          <div className='flex flex-wrap justify-between items-center gap-3'>
            <div className='flex flex-wrap gap-2'>
              <Skeleton className='rounded-full w-24 h-6' />
              <Skeleton className='rounded-full w-20 h-6' />
            </div>

            <Skeleton className='w-28 max-w-full h-3.5' />
          </div>

          <div className='flex sm:flex-row flex-col sm:items-center gap-4 min-w-0'>
            <Skeleton className='rounded-2xl size-16 sm:size-20 shrink-0' />

            <div className='flex-1 space-y-3 min-w-0'>
              <Skeleton className='w-3/4 max-w-full h-7 sm:h-8' />
              <div className='flex flex-wrap gap-2'>
                <Skeleton className='w-28 h-4' />
                <Skeleton className='w-24 h-4' />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='space-y-5 px-4 sm:px-6 pb-5 sm:pb-6'>
          {/* Progress */}
          <div className='space-y-4 bg-muted/20 p-3 sm:p-4 border border-border/60 rounded-xl'>
            <div className='flex flex-wrap justify-between items-center gap-3'>
              <Skeleton className='w-36 max-w-full h-5' />
              <Skeleton className='w-28 max-w-full h-4' />
            </div>

            <Skeleton className='rounded-full w-full h-2.5' />
          </div>

          {/* Description */}
          <div className='space-y-3 pt-4 border-border/60 border-t'>
            <Skeleton className='w-28 h-5' />
            <div className='space-y-2'>
              <Skeleton className='w-full h-3.5' />
              <Skeleton className='w-full h-3.5' />
              <Skeleton className='w-4/5 max-w-full h-3.5' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requester and organization */}
      <div className='items-stretch gap-5 grid grid-cols-1 lg:grid-cols-2 min-w-0'>
        <SectionSkeleton titleWidth='w-24' descriptionWidth='w-56'>
          <RequesterSkeleton />
        </SectionSkeleton>

        <SectionSkeleton titleWidth='w-36' descriptionWidth='w-64'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='w-40 max-w-full h-4' />
              <Skeleton className='w-24 h-3.5' />
            </div>

            <Skeleton className='w-44 max-w-full h-4' />
            <Skeleton className='w-52 max-w-full h-4' />
            <Skeleton className='w-36 max-w-full h-4' />
          </div>
        </SectionSkeleton>
      </div>

      {/* Donation location */}
      <SectionSkeleton titleWidth='w-40' descriptionWidth='w-64'>
        <div className='flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4 min-w-0'>
          <div className='flex flex-1 items-start gap-3 min-w-0'>
            <Skeleton className='rounded-xl size-10 shrink-0' />

            <div className='flex-1 space-y-2 pt-1 min-w-0'>
              <Skeleton className='w-full h-3.5' />
              <Skeleton className='w-4/5 max-w-full h-3.5' />
            </div>
          </div>

          <Skeleton className='w-full sm:w-36 h-10' />
        </div>
      </SectionSkeleton>

      {/* Request dates */}
      <Card className='gap-0 py-0 border-border/70 min-w-0'>
        <CardHeader className='p-4 sm:p-5'>
          <Skeleton className='w-44 max-w-full h-5' />
        </CardHeader>

        <CardContent className='px-4 sm:px-5 pb-4 sm:pb-5'>
          <div className='gap-x-6 gap-y-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 min-w-0'>
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className='space-y-2 min-w-0'>
                <Skeleton className='w-24 max-w-full h-3.5' />
                <Skeleton className='w-36 max-w-full h-4' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className='flex sm:flex-row flex-col sm:justify-end gap-3 pt-5 border-border/60 border-t min-w-0'>
        <Skeleton className='w-full sm:w-36 h-10' />
        <Skeleton className='w-full sm:w-40 h-10' />
      </div>
    </div>
  );
}
