import Link from "next/link";
import { ArrowRight, Building2, HeartHandshake, Search } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Find Blood Donors",
    description:
      "Discover potential donors by blood group and location to help you find relevant connections when every moment counts.",
    href: "/find-donors",
    icon: Search,
    action: "Explore donors",
    accent: "Donor discovery",
  },
  {
    number: "02",
    title: "Blood Requests",
    description:
      "Explore blood requests, learn about patients' needs, and respond to help connect people with potential donors.",
    href: "/find-requests",
    icon: HeartHandshake,
    action: "View requests",
    accent: "Give hope",
  },
  {
    number: "03",
    title: "Organizations",
    description:
      "Discover hospitals, blood banks, and other organizations that support blood donation and patient care.",
    href: "/find-organizations",
    icon: Building2,
    action: "Explore organizations",
    accent: "Community network",
  },
];

export default function Services() {
  return (
    <section className='relative bg-muted/30 overflow-hidden'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
        {/* Section heading */}
        <div className='mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-background px-3 py-1.5 border border-primary/15 rounded-full font-medium text-primary text-sm'>
            <HeartHandshake className='size-4' />
            Explore Blood AidX
          </div>

          <h2 className='mt-5 font-bold text-3xl sm:text-4xl lg:text-5xl lg:leading-tight tracking-tight'>
            Help starts with the{" "}
            <span className='text-primary'>right connection.</span>
          </h2>

          <p className='mx-auto mt-4 max-w-xl text-muted-foreground text-base sm:text-lg leading-7'>
            Find the tools you need to donate blood, discover support, or
            connect with organizations making a difference.
          </p>
        </div>

        {/* Service cards */}
        <div className='gap-5 grid md:grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-14'>
          {services.map(
            ({
              number,
              title,
              description,
              href,
              icon: Icon,
              action,
              accent,
            }) => (
              <article
                key={number}
                className='group relative flex flex-col bg-card hover:shadow-primary/[0.05] hover:shadow-xl p-6 sm:p-7 border border-border/70 hover:border-primary/30 rounded-2xl h-full overflow-hidden transition-all hover:-translate-y-1 duration-300'
              >
                {/* Decorative background */}
                <div
                  aria-hidden='true'
                  className='-top-12 -right-12 absolute bg-primary/[0.04] rounded-full size-36 group-hover:scale-150 transition-transform duration-500 pointer-events-none'
                />

                <div className='relative flex justify-between items-start gap-4'>
                  <div className='flex justify-center items-center bg-primary/10 group-hover:bg-primary rounded-2xl size-14 text-primary group-hover:text-primary-foreground transition-colors duration-300'>
                    <Icon className='size-6' />
                  </div>

                  <span className='pt-1 font-semibold tabular-nums text-muted-foreground/50 text-sm tracking-widest'>
                    {number}
                  </span>
                </div>

                <p className='mt-6 font-semibold text-primary text-xs uppercase tracking-[0.16em]'>
                  {accent}
                </p>

                <h3 className='mt-2 font-semibold text-xl sm:text-2xl tracking-tight'>
                  {title}
                </h3>

                <p className='flex-1 mt-3 text-muted-foreground text-sm sm:text-base leading-7'>
                  {description}
                </p>

                <div className='mt-6 pt-5 border-border/70 border-t'>
                  <Link
                    href={href}
                    className='inline-flex items-center gap-2 focus-visible:rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 min-h-10 font-semibold text-primary hover:text-primary/80 text-sm transition-colors'
                  >
                    {action}
                    <ArrowRight className='size-4 transition-transform group-hover:translate-x-1 duration-300' />
                  </Link>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
