import Hero from "@/components/home/hero";
import Services from "@/components/home/services";
import HowItWorks from "@/components/home/how-it-works";
import CTA from "@/components/home/cta";
import Benefits from "@/components/home/benefits";

export default function HomePage() {
  return (
    <main className='overflow-hidden'>
      <Hero />
      <Services />
      <HowItWorks />
      <Benefits />
      <CTA />
    </main>
  );
}
