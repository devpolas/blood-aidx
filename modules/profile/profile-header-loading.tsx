import { UserIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function ProfileHeaderLoading() {
  return (
    <Card className='overflow-hidden'>
      <div className='bg-brand/5 px-4 sm:px-6 lg:px-8 py-5 sm:py-7 border-brand/10 border-b'>
        <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-5'>
          <div className='flex items-center gap-3 sm:gap-5 min-w-0'>
            <div className='flex justify-center items-center bg-brand/10 rounded-full size-16 sm:size-20 lg:size-24 text-brand/40 animate-pulse shrink-0'>
              <UserIcon className='size-7 sm:size-8 lg:size-10' />
            </div>

            <div className='flex-1 space-y-3 min-w-0'>
              <div className='bg-muted rounded-md w-40 sm:w-52 h-6 sm:h-7 animate-pulse' />
              <div className='bg-muted rounded-md w-48 sm:w-64 max-w-full h-4 animate-pulse' />
              <div className='bg-muted rounded-full w-20 h-5 animate-pulse' />
            </div>
          </div>

          <div className='bg-muted rounded-md w-full sm:w-28 h-9 animate-pulse' />
        </div>
      </div>

      <CardContent className='gap-5 grid sm:grid-cols-2 lg:grid-cols-4 p-4 sm:p-6 lg:p-8'>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className='flex gap-3'>
            <div className='bg-brand/10 rounded-lg size-9 animate-pulse shrink-0' />

            <div className='flex-1 space-y-2 min-w-0'>
              <div className='bg-muted rounded w-16 h-3 animate-pulse' />
              <div className='bg-muted rounded w-28 max-w-full h-5 animate-pulse' />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
