import Image from "next/image";
import Link from "next/link";

import { LOGO } from "@/constraints/indes";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <Link
      href='/'
      aria-label='Blood AidX home'
      className={cn("flex flex-row items-center shrink-0", className)}
    >
      <span
        className={cn("relative place-content-center grid size-7 shrink-0")}
      >
        <Image
          src={LOGO}
          alt='logo'
          fill
          priority
          sizes='28px'
          className='object-contain'
        />
      </span>

      <span className='font-extrabold text-lg md:text-xl xl:text-2xl tracking-tight whitespace-nowrap'>
        <span className='text-brand'>Blood</span>
        <span className='text-foreground'>
          A<span className='text-brand'>i</span>dX
        </span>
      </span>
    </Link>
  );
}
