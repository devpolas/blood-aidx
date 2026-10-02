"use client";
import Link from "next/link";
import { PUBLIC_NAVIGATION } from "@/config";

export default function NavbarLinks() {
  return (
    <nav className='hidden md:flex items-center gap-4 md:gap-6 xl:gap-14'>
      {PUBLIC_NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='font-medium text-brand-muted md:text-[16px] hover:text-brand text-sm lg:text-xl transition-colors'
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
