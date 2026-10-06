import Link from "next/link";
import { PUBLIC_NAVIGATION } from "@/config";

export default function NavbarLinks() {
  return (
    <nav className='hidden lg:flex items-center gap-6 xl:gap-10'>
      {PUBLIC_NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='font-medium text-brand-muted hover:text-brand text-base lg:text-lg xl:text-xl transition-colors'
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
