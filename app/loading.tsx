import Image from "next/image";

import { Muted } from "@/components/typography/typography";
import { APP_NAME, LOGO } from "@/constraints";

export default function Loading() {
  return (
    <main className='flex justify-center items-center px-4 min-h-[70vh]'>
      <div
        role='status'
        aria-live='polite'
        aria-label={`Loading ${APP_NAME}`}
        className='flex flex-col items-center text-center'
      >
        {/* Brand */}
        <div aria-hidden='true' className='inline-flex select-none shrink-0'>
          <span className='inline-flex items-center font-extrabold text-lg md:text-xl xl:text-2xl leading-none tracking-tight whitespace-nowrap'>
            <span className='mt-1.5 text-brand'>Blood</span>

            <span className='inline-block relative size-6 translate-y-px shrink-0'>
              <Image
                src={LOGO}
                alt=''
                fill
                priority
                sizes='24px'
                className='object-contain animate-pulse motion-reduce:animate-none'
              />
            </span>

            <span className='mt-1.5 text-foreground'>
              A<span className='text-brand'>i</span>dX
            </span>
          </span>
        </div>

        {/* Loading indicator */}
        <div
          aria-hidden='true'
          className='flex items-center gap-1.5 mt-2.5 h-2'
        >
          <span className='bg-brand rounded-full size-1.5 animate-pulse motion-reduce:animate-none [animation-delay:-400ms]' />
          <span className='bg-brand rounded-full size-1.5 animate-pulse motion-reduce:animate-none [animation-delay:-200ms]' />
          <span className='bg-brand rounded-full size-1.5 animate-pulse motion-reduce:animate-none' />
        </div>

        {/* Loading message */}
        <div className='space-y-1 mt-4'>
          <p className='font-medium text-foreground'>Loading {APP_NAME}</p>

          <Muted>Preparing your experience...</Muted>
        </div>

        {/* Screen-reader announcement */}
        <span className='sr-only'>Please wait while {APP_NAME} loads.</span>
      </div>
    </main>
  );
}
