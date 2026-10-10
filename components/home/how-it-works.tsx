import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Search,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find what you need",
    description:
      "Discover potential blood donors, explore active blood requests, or find healthcare organizations.",
    icon: Search,
  },
  {
    number: "02",
    title: "Connect with people",
    description:
      "Explore available contact details and respond to blood requests to connect with people who need help.",
    icon: HeartHandshake,
  },
  {
    number: "03",
    title: "Make a difference",
    description:
      "Take the next step toward donating blood, supporting a patient, or helping your community.",
    icon: CheckCircle2,
  },
];

export default function HowItWorks() {
  return (
    <section className='isolate relative bg-muted/30 border-y overflow-hidden'>
      <div
        aria-hidden='true'
        className='top-0 -right-32 -z-10 absolute bg-primary/[0.06] blur-3xl rounded-full size-80 pointer-events-none'
      />

      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
        <div className='lg:items-center gap-12 lg:gap-16 grid lg:grid-cols-[0.85fr_1.15fr]'>
          {/* Section introduction */}
          <div className='max-w-xl'>
            <div className='inline-flex items-center gap-2 bg-background px-3 py-1.5 border border-primary/15 rounded-full font-medium text-primary text-sm'>
              <HeartHandshake className='size-4' />
              How Blood AidX works
            </div>

            <h2 className='mt-5 font-bold text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.15] tracking-tight'>
              Small steps.
              <br />
              <span className='text-primary'>Life-changing</span> impact.
            </h2>

            <p className='mt-5 text-muted-foreground text-base sm:text-lg leading-7 sm:leading-8'>
              Whether you&apos;re looking for a donor or ready to help someone
              in need, Blood AidX makes it easier to find the right starting
              point.
            </p>

            <div className='flex sm:flex-row flex-col gap-3 mt-7'>
              <Link
                href='/find-donors'
                className='group inline-flex justify-center items-center gap-2 bg-primary hover:opacity-90 shadow-sm px-5 py-3 rounded-xl min-h-12 font-semibold text-primary-foreground text-sm transition'
              >
                Get started
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Link>

              <Link
                href='/find-requests'
                className='inline-flex justify-center items-center gap-2 bg-background hover:bg-primary/5 px-5 py-3 border border-border hover:border-primary/30 rounded-xl min-h-12 font-semibold text-sm transition'
              >
                Explore requests
              </Link>
            </div>

            <div className='flex items-start gap-3 mt-8 pt-6 border-t'>
              <div className='flex justify-center items-center bg-primary/10 rounded-xl size-10 text-primary shrink-0'>
                <MapPin className='size-5' />
              </div>

              <div>
                <p className='font-semibold text-sm'>
                  Start with your community
                </p>
                <p className='mt-1 text-muted-foreground text-sm leading-6'>
                  Explore donors, requests, and organizations through one
                  platform.
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className='relative'>
            <div
              aria-hidden='true'
              className='hidden sm:block top-12 bottom-12 left-6 absolute bg-border w-px'
            />

            <div className='space-y-4'>
              {steps.map(({ number, title, description, icon: Icon }) => (
                <article
                  key={number}
                  className='group relative flex gap-4 sm:gap-5 bg-card p-5 sm:p-6 border border-border/70 hover:border-primary/30 rounded-2xl transition-colors'
                >
                  <div className='z-10 relative flex justify-center items-center bg-primary/10 group-hover:bg-primary border border-primary/10 rounded-xl size-12 text-primary group-hover:text-primary-foreground transition-colors shrink-0'>
                    <Icon className='size-5' />
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                      <span className='font-bold text-primary text-xs tracking-widest'>
                        STEP {number}
                      </span>
                    </div>

                    <h3 className='mt-2 font-semibold text-lg sm:text-xl tracking-tight'>
                      {title}
                    </h3>

                    <p className='mt-2 text-muted-foreground text-sm sm:text-base leading-7'>
                      {description}
                    </p>
                  </div>

                  <ArrowRight className='hidden sm:block mt-1 size-5 text-muted-foreground/50 group-hover:text-primary transition group-hover:translate-x-1 shrink-0' />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
