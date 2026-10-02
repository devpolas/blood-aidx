"use client";
import Link from "next/link";
import { PUBLIC_NAVIGATION } from "@/config";

export default function NavbarLinks() {
  return (
    <nav className='hidden md:flex items-center gap-5 lg:gap-10 xl:gap-14'>
      {PUBLIC_NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='font-medium text-muted-foreground hover:text-brand text-sm md:text-lg lg:text-xl transition-colors'
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
