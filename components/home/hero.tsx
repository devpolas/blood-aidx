import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Droplets,
  HeartHandshake,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const highlights = [
  "Community focused",
  "Location-aware discovery",
  "Connecting people",
];

const destinations = [
  {
    title: "Find Donors",
    description: "Discover blood donors",
    href: "/find-donors",
    icon: Users,
  },
  {
    title: "Blood Requests",
    description: "Help people in need",
    href: "/find-requests",
    icon: HeartHandshake,
  },
  {
    title: "Organizations",
    description: "Explore care providers",
    href: "/find-organizations",
    icon: Building2,
  },
];

export default function Hero() {
  return (
    <section className='isolate relative bg-gradient-to-b from-primary/[0.07] via-background to-background border-b overflow-hidden'>
      {/* Background decoration */}
      <div
        aria-hidden='true'
        className='-top-24 -right-32 -z-10 absolute bg-primary/10 blur-3xl rounded-full size-96 pointer-events-none'
      />
      <div
        aria-hidden='true'
        className='-bottom-32 -left-32 -z-10 absolute bg-primary/[0.07] blur-3xl rounded-full size-96 pointer-events-none'
      />

      <div className='items-center gap-12 lg:gap-16 grid 2xl:grid-cols-2 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-11/12'>
        {/* Hero content */}
        <div>
          <div className='inline-flex items-center gap-2 bg-background/80 shadow-sm backdrop-blur mb-6 px-3.5 py-2 border border-primary/15 rounded-full font-medium text-primary text-sm'>
            <Droplets className='size-4' />
            Every donation matters
          </div>

          <h1 className='font-bold text-foreground text-4xl sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight'>
            Give blood.
            <br />
            <span className='text-primary'>Give hope.</span>
            <br />
            Save lives.
          </h1>

          <p className='mt-6 max-w-xl text-muted-foreground text-base sm:text-lg leading-7 sm:leading-8'>
            Blood AidX brings donors, people in need, volunteers, and healthcare
            organizations together to make finding and donating blood easier.
          </p>

          {/* Primary actions */}
          <div className='flex sm:flex-row flex-col gap-3 mt-8'>
            <Link
              href='/find-donors'
              className='group inline-flex justify-center items-center gap-2 bg-primary hover:opacity-90 shadow-sm px-6 py-3 rounded-xl min-h-12 font-semibold text-primary-foreground text-sm transition'
            >
              <Search className='size-4' />
              Find Blood Donors
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
            </Link>

            <Link
              href='/find-requests'
              className='inline-flex justify-center items-center gap-2 bg-background hover:bg-primary/5 px-6 py-3 border border-border hover:border-primary/40 rounded-xl min-h-12 font-semibold text-foreground text-sm transition'
            >
              <HeartHandshake className='size-4 text-primary' />
              Explore Blood Requests
            </Link>
          </div>

          {/* Key benefits */}
          <div className='flex flex-wrap gap-x-5 gap-y-3 mt-8'>
            {highlights.map((highlight) => (
              <span
                key={highlight}
                className='inline-flex items-center gap-2 text-muted-foreground text-sm'
              >
                <CheckCircle2 className='size-4 text-primary shrink-0' />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className='relative lg:ml-auto w-full'>
          <div
            aria-hidden='true'
            className='absolute inset-10 bg-primary/10 blur-3xl rounded-full'
          />

          <div className='relative bg-card shadow-primary/5 shadow-xl p-5 sm:p-7 border border-border/70 rounded-3xl overflow-hidden'>
            {/* Visual header */}
            <div className='flex justify-between items-start gap-4'>
              <div>
                <p className='font-medium text-muted-foreground text-sm'>
                  The power of giving
                </p>
                <h2 className='mt-1 font-bold text-xl sm:text-2xl tracking-tight'>
                  One community. One purpose.
                </h2>
              </div>

              <div className='flex justify-center items-center bg-primary/10 rounded-2xl size-12 text-primary shrink-0'>
                <Droplets className='size-7' />
              </div>
            </div>

            {/* Central illustration */}
            <div className='relative flex justify-center items-center bg-gradient-to-br from-primary/10 via-primary/[0.04] to-transparent my-7 py-10 sm:py-12 border border-primary/10 rounded-2xl overflow-hidden'>
              <div
                aria-hidden='true'
                className='absolute border border-primary/10 rounded-full size-48 sm:size-56'
              />
              <div
                aria-hidden='true'
                className='absolute border border-primary/10 rounded-full size-36 sm:size-44'
              />

              <div className='relative flex justify-center items-center bg-background shadow-primary/10 shadow-xl border border-primary/10 rounded-full size-32 sm:size-40'>
                <div className='flex justify-center items-center bg-primary shadow-lg shadow-primary/25 rounded-full size-24 sm:size-32 text-primary-foreground'>
                  <Droplets className='size-14 sm:size-16' />
                </div>
              </div>

              {/* Community indicator */}
              <div className='top-4 sm:top-6 left-3 sm:left-5 absolute flex items-center gap-2 bg-background/95 shadow-sm px-3 py-2 border rounded-xl'>
                <div className='flex justify-center items-center bg-primary/10 rounded-lg size-8 text-primary'>
                  <ShieldCheck className='size-4' />
                </div>
                <div>
                  <p className='font-semibold text-xs'>Community</p>
                  <p className='text-[10px] text-muted-foreground'>
                    Together for life
                  </p>
                </div>
              </div>

              {/* Location indicator */}
              <div className='right-3 sm:right-5 bottom-4 sm:bottom-6 absolute flex items-center gap-2 bg-background/95 shadow-sm px-3 py-2 border rounded-xl'>
                <MapPin className='size-4 text-primary' />
                <span className='font-medium text-xs'>Connecting locally</span>
              </div>
            </div>

            {/* Navigation cards */}
            <div className='gap-2 sm:gap-3 grid grid-cols-3'>
              {destinations.map(({ title, description, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className='group bg-background hover:bg-primary/[0.03] p-3 sm:p-4 border border-border/70 hover:border-primary/30 rounded-xl text-center transition'
                >
                  <div className='flex justify-center items-center bg-primary/10 group-hover:bg-primary mx-auto rounded-xl size-10 text-primary group-hover:text-primary-foreground transition'>
                    <Icon className='size-5' />
                  </div>

                  <p className='mt-3 font-semibold text-xs sm:text-sm'>
                    {title}
                  </p>

                  <p className='hidden sm:block mt-1 text-muted-foreground text-xs leading-5'>
                    {description}
                  </p>
                </Link>
              ))}
            </div>

            <p className='mt-5 text-muted-foreground text-sm text-center leading-6'>
              Every connection is an opportunity to make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
