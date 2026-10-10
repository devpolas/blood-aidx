import Link from "next/link";
import { ArrowRight, Building2, HeartHandshake, Search } from "lucide-react";

export default function CTA() {
  return (
    <section className='px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20'>
      <div className='relative bg-primary mx-auto rounded-3xl overflow-hidden text-primary-foreground'>
        {/* Decorative background */}
        <div
          aria-hidden='true'
          className='-top-32 -right-24 absolute border border-primary-foreground/10 rounded-full size-96 pointer-events-none'
        />
        <div
          aria-hidden='true'
          className='-top-16 -right-8 absolute border border-primary-foreground/10 rounded-full size-64 pointer-events-none'
        />
        <div
          aria-hidden='true'
          className='-bottom-40 left-1/3 absolute border border-primary-foreground/10 rounded-full size-80 pointer-events-none'
        />
        <div
          aria-hidden='true'
          className='absolute inset-0 bg-gradient-to-br from-primary-foreground/[0.08] via-transparent to-transparent pointer-events-none'
        />

        <div className='relative lg:items-center gap-10 lg:gap-12 grid lg:grid-cols-[1fr_auto] px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16'>
          {/* Content */}
          <div className='max-w-2xl'>
            <div className='inline-flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 border border-primary-foreground/20 rounded-full font-medium text-primary-foreground/90 text-sm'>
              <HeartHandshake className='size-4' />
              Be part of the difference
            </div>

            <h2 className='mt-5 font-bold text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.15] tracking-tight'>
              Someone may need your help today.
            </h2>

            <p className='mt-5 max-w-xl text-primary-foreground/80 text-base sm:text-lg leading-7 sm:leading-8'>
              A small step can make a meaningful difference. Discover donors,
              respond to blood requests, or connect with organizations in your
              community.
            </p>
          </div>

          {/* Actions */}
          <div className='flex sm:flex-row flex-col lg:flex-col gap-3 w-full lg:w-auto'>
            <Link
              href='/find-donors'
              className='group inline-flex justify-center items-center gap-2 bg-background hover:bg-background/90 shadow-sm px-5 py-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary min-h-12 font-semibold text-foreground text-sm transition'
            >
              <Search className='size-4' />
              Find Blood Donors
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
            </Link>

            <Link
              href='/find-organizations'
              className='inline-flex justify-center items-center gap-2 hover:bg-primary-foreground/10 px-5 py-3 border border-primary-foreground/30 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary min-h-12 font-semibold text-primary-foreground text-sm transition'
            >
              <Building2 className='size-4' />
              Explore Organizations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
