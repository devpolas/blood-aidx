import Link from "next/link";
import { LogOutIcon, Menu } from "lucide-react";

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
import { Loader, LoadingSpinner } from "../loading/loading";
import { PUBLIC_NAVIGATION } from "@/config";
import { useRouter } from "next/navigation";

type MobileNavbarProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
  dashboardHref: string;
  isLogoutPending: boolean;
  logoutCurrentUser: () => void;
};

export default function MobileNavbar({
  isLoading,
  isAuthenticated,
  dashboardHref,
  isLogoutPending,
  logoutCurrentUser,
}: MobileNavbarProps) {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='lg:hidden hover:bg-brand/10'
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

        <nav className='flex flex-col flex-1 gap-4 px-4'>
          {PUBLIC_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='hover:bg-brand/10 rounded-lg font-medium text-brand-muted hover:text-brand text-base transition-colors'
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <SheetFooter className='bg-background/30 border-brand/10 border-t'>
          <div className='slide-in-from-bottom-[2px] w-full animate-in motion-reduce:animate-none duration-200 ease-out fade-in-0'>
            {isLoading ? (
              <div className='flex justify-center items-center min-h-10'>
                <LoadingSpinner
                  shimmer
                  spinnerClassName='text-brand'
                  textClassName='text-brand'
                  aria-live='polite'
                  className='font-medium text-sm'
                >
                  Authenticating...
                </LoadingSpinner>
              </div>
            ) : isAuthenticated ? (
              <div className='flex gap-2 w-full'>
                <Button
                  variant='destructive'
                  size='sm'
                  disabled={isLogoutPending}
                  className={"hover:cursor-pointer flex-1"}
                  onClick={() => {
                    if (!isLogoutPending) {
                      router.replace(dashboardHref);
                    }
                  }}
                >
                  Go to Dashboard
                </Button>

                <Button
                  variant='outline'
                  size='icon-sm'
                  className='shrink-0'
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
              <div className='flex gap-2 w-full'>
                <Button
                  size='sm'
                  variant='outline'
                  className='flex-1'
                  nativeButton={false}
                  render={<Link href='/signin'>Sign In</Link>}
                >
                  Sign In
                </Button>

                <Button
                  size='sm'
                  variant='destructive'
                  className='flex-1'
                  nativeButton={false}
                  render={<Link href='/signup'>Get Started</Link>}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
