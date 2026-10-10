import {
  ArrowUpRight,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "A community that cares",
    description:
      "Bring donors, recipients, volunteers, and healthcare organizations together around one shared purpose.",
    icon: Users,
  },
  {
    number: "02",
    title: "Discover help nearby",
    description:
      "Explore blood donors, urgent requests, and organizations by location to find relevant connections.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Connection built on trust",
    description:
      "Account and organization verification features help create a more organized and trustworthy community.",
    icon: ShieldCheck,
  },
];

export default function Benefits() {
  return (
    <section className='relative overflow-hidden'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
        {/* Section heading */}
        <div className='mx-auto text-center'>
          <div className='inline-flex items-center gap-2 bg-primary/5 px-3 py-1.5 border border-primary/15 rounded-full font-medium text-primary text-sm'>
            <HeartHandshake className='size-4' />
            Why Blood AidX
          </div>

          <h2 className='mt-5 font-bold text-3xl sm:text-4xl lg:text-5xl lg:leading-tight tracking-tight'>
            Technology with a{" "}
            <span className='text-primary'>human purpose.</span>
          </h2>

          <p className='mx-auto mt-4 max-w-xl text-muted-foreground text-base sm:text-lg leading-7'>
            Every connection matters. We bring essential discovery tools
            together to help people support one another when it matters most.
          </p>
        </div>

        {/* Feature cards */}
        <div className='gap-5 grid md:grid-cols-3 mt-10 sm:mt-14'>
          {features.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className='group relative flex flex-col bg-card hover:shadow-lg hover:shadow-primary/[0.04] p-6 sm:p-7 border border-border/70 hover:border-primary/30 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 duration-300'
            >
              <div className='flex justify-between items-start'>
                <div className='flex justify-center items-center bg-primary/10 group-hover:bg-primary rounded-xl size-12 text-primary group-hover:text-primary-foreground transition-colors duration-300'>
                  <Icon className='size-5' />
                </div>

                <span className='font-semibold tabular-nums text-muted-foreground/50 text-sm tracking-wider'>
                  {number}
                </span>
              </div>

              <h3 className='mt-6 font-semibold text-xl tracking-tight'>
                {title}
              </h3>

              <p className='flex-1 mt-3 text-muted-foreground text-sm sm:text-base leading-7'>
                {description}
              </p>

              <div className='flex items-center gap-2 mt-6 pt-4 border-border/70 border-t font-medium text-primary text-sm'>
                <span>Making connections matter</span>
                <ArrowUpRight className='size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300' />
              </div>

              <div
                aria-hidden='true'
                className='-top-12 -right-12 absolute bg-primary/[0.035] rounded-full size-32 group-hover:scale-150 transition-transform duration-500 pointer-events-none'
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
