"use client";
import Link from "next/link";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import NavbarLinks from "./navbar-links";
import AuthButtons from "./auth-buttons";
import MobileNavbar from "./mobile-navbar";
import { ThemeSwitcher } from "../theme/theme.switcher";
import { LoadingSpinner } from "../loading/loading";
import useAuth from "@/hooks/use-auth";

export default function Navbar() {
  const { isAuthenticated, isLoading, user } = useAuth();
  return (
    <header className='top-0 z-50 sticky w-full'>
      <nav className='bg-brand/5 supports-backdrop-filter:bg-brand/5 border-brand/15 border-b glass'>
        <div className='flex justify-between items-center gap-2 mx-auto px-4 w-full lg:max-w-11/12 h-12 md:h-14'>
          <Logo /> <NavbarLinks />
          <div className='flex items-center gap-1.5'>
            <ThemeSwitcher />
            <div className='hidden md:flex'>
              {isLoading ? (
                <LoadingSpinner />
              ) : isAuthenticated ? (
                <Button
                  variant='destructive'
                  size='sm'
                  nativeButton={false}
                  render={
                    <Link href={`/dashboard/${user?.role.toLowerCase()}`}>
                      Go to Dashboard
                    </Link>
                  }
                />
              ) : (
                <AuthButtons />
              )}
            </div>
            <MobileNavbar />
          </div>
        </div>
      </nav>
    </header>
  );
}
