"use client";

import { LogOutIcon } from "lucide-react";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import NavbarLinks from "./navbar.links";
import AuthButtons from "./auth.buttons";
import MobileNavbar from "./mobile.navbar";
import { ThemeSwitcher } from "../theme/theme.switcher";
import { useAuth } from "@/hooks";
import { Loader, LoadingSpinner } from "../loading/loading";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const {
    isAuthenticated,
    isLoading,
    user,
    logout,
    isLogoutPending,
    refreshUser,
  } = useAuth();

  const dashboardHref = user
    ? user.role === "user"
      ? "/dashboard"
      : `/dashboard/${user.role.toLocaleLowerCase()}`
    : "#";

  async function logoutCurrentUser() {
    await logout();
    await refreshUser();
    router.replace("/signin");
  }

  return (
    <header className='top-0 z-50 sticky w-full'>
      <nav className='bg-brand/5 supports-backdrop-filter:bg-brand/5 border-brand/15 border-b glass'>
        <div className='flex justify-between items-center gap-2 mx-auto px-4 w-full lg:max-w-11/12 h-12 lg:h-14'>
          <Logo />

          <NavbarLinks />

          <div className='flex items-center gap-1'>
            <ThemeSwitcher />

            <div className='hidden lg:flex justify-center items-center w-44'>
              <div className='slide-in-from-bottom-[2px] animate-in motion-reduce:animate-none duration-200 ease-out fade-in-0'>
                {isLoading ? (
                  <LoadingSpinner
                    shimmer
                    spinnerClassName='text-brand'
                    textClassName='text-brand'
                    aria-live='polite'
                    className='font-medium text-sm'
                  >
                    Authenticating...
                  </LoadingSpinner>
                ) : isAuthenticated ? (
                  <div className='flex justify-center items-center gap-1'>
                    <Button
                      variant='destructive'
                      size='sm'
                      disabled={isLogoutPending}
                      className={"hover:cursor-pointer"}
                      onClick={() => {
                        if (!isLogoutPending) {
                          router.replace(dashboardHref);
                        }
                      }}
                    >
                      Go to Dashboard
                    </Button>

                    <Button
                      size='icon-sm'
                      variant='outline'
                      className={"hover:cursor-pointer"}
                      disabled={isLogoutPending}
                      onClick={logoutCurrentUser}
                      aria-label='Log out'
                    >
                      {isLogoutPending ? (
                        <Loader className='text-brand' />
                      ) : (
                        <LogOutIcon className='size-4' />
                      )}
                    </Button>
                  </div>
                ) : (
                  <AuthButtons />
                )}
              </div>
            </div>

            <MobileNavbar
              dashboardHref={dashboardHref}
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
              logoutCurrentUser={logoutCurrentUser}
              isLogoutPending={isLogoutPending}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
