import Image from "next/image";

import { Shimmer } from "@/components/shared/loading/loading";
import { APP_NAME, LOGO } from "@/constraints";
import { HeartPulse } from "lucide-react";

export default function Loading() {
  return (
    <main className='flex justify-center items-center px-4 min-h-[70vh]'>
      <div
        role='status'
        aria-live='polite'
        aria-label={`Loading ${APP_NAME}`}
        className='flex flex-col items-center text-center'
      >
        <div aria-hidden='true' className='inline-flex select-none shrink-0'>
          <span className='inline-flex items-center font-extrabold text-lg md:text-xl xl:text-2xl leading-none tracking-tight whitespace-nowrap'>
            <span className='mt-1.5 text-brand'>Blood</span>

            <span className='inline-block relative size-6 translate-y-px animate-pulse shrink-0'>
              <Image
                src={LOGO}
                alt=''
                fill
                sizes='24px'
                className='object-contain'
              />
            </span>

            <span className='mt-1.5 text-foreground'>
              A<span className='text-brand'>i</span>dX
            </span>
          </span>
        </div>

        <Shimmer className='mt-1 text-muted-foreground text-sm'>
          <div className='flex items-center gap-2 text-muted-foreground text-sm'>
            <HeartPulse className='size-4 text-brand animate-pulse' />
            Preparing your Blood AidX experiences...
          </div>
        </Shimmer>
      </div>
    </main>
  );
}
