import Image from "next/image";
import Link from "next/link";

import { APP_NAME, LOGO } from "@/constraints";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  return (
    <Link
      href='/'
      aria-label={`${APP_NAME} home`}
      className={cn("inline-flex select-none shrink-0", className)}
    >
      <span className='inline-flex items-center font-extrabold text-lg md:text-xl xl:text-2xl leading-none tracking-tight whitespace-nowrap'>
        <span className='mt-1.5 text-brand'>Blood</span>

        <span className='inline-block relative size-6 translate-y-px shrink-0'>
          <Image
            src={LOGO}
            alt={`${APP_NAME} logo`}
            fill
            priority
            sizes='24px'
            className='object-contain'
          />
        </span>

        <span className='mt-1.5 text-foreground'>
          A<span className='text-brand'>i</span>dX
        </span>
      </span>
    </Link>
  );
}
