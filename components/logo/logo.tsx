"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME, LOGO } from "@/constraints";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
type Props = { className?: string };

export default function Logo({ className }: Props) {
  const isMobile = useIsMobile();
  return (
    <Link
      href='/'
      aria-label={`${APP_NAME} home`}
      className={cn("inline-flex select-none shrink-0", className)}
    >
      <span className='inline-flex items-center font-extrabold text-xl lg:text-2xl leading-none tracking-tight'>
        <span className='mt-1 text-brand'>Blood</span>
        <span
          className={`inline-block relative ${isMobile ? "size-4" : "size-5"} translate-y-px shrink-0`}
        >
          <Image
            src={LOGO}
            alt={`${APP_NAME} logo`}
            fill
            priority
            sizes={isMobile ? "16px" : "20px"}
            className='object-contain'
          />
        </span>
        <span className='mt-1 text-foreground'>
          A<span className='text-brand'>i</span>dX
        </span>
      </span>
    </Link>
  );
}
