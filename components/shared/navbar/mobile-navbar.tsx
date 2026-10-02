"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo/logo";
import { LoadingSpinner } from "../loading/loading";
import { PUBLIC_NAVIGATION } from "@/config";
import useAuth from "@/hooks/use-auth";

export default function MobileNavbar() {
  const { isLoading, isAuthenticated, user } = useAuth();
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden hover:bg-brand/10'
          >
            <Menu className='size-6' />
            <span className='sr-only'>Open navigation menu</span>
          </Button>
        }
      />
      <SheetContent
        side='right'
        className='bg-brand/5 supports-backdrop-filter:bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-brand/15'
      >
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className='flex flex-col gap-2 px-4'>
          {PUBLIC_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='font-medium text-brand-muted hover:text-brand text-lg transition-colors'
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <SheetFooter>
          <Button
            variant='destructive'
            className='w-full'
            nativeButton={false}
            render={
              isLoading ? (
                <LoadingSpinner spinnerClassName='text-brand' />
              ) : isAuthenticated ? (
                <Link href={`/dashboard/${user?.role.toLowerCase()}`}>
                  Go to Dashboard
                </Link>
              ) : (
                <Link href='/signup'>Get Started</Link>
              )
            }
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
