"use client";

import { LoadingSpinner } from "@/components/shared/loading/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useAuth from "@/hooks/use-auth";
import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const { logout, isLogoutPending, refreshUser } = useAuth();

  async function logoutCurrentUser() {
    await logout();
    await refreshUser();
  }

  const fallbackName = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer'
              >
                <Avatar className='grayscale rounded-lg size-8'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className='rounded-lg'>
                    {fallbackName}
                  </AvatarFallback>
                </Avatar>

                <div className='flex-1 grid text-sm text-left leading-tight'>
                  <span className='font-medium truncate'>{user.name}</span>
                  <span className='text-muted-foreground text-xs truncate'>
                    {user.email}
                  </span>
                </div>

                <EllipsisVerticalIcon className='ml-auto size-4' />
              </SidebarMenuButton>
            }
          />

          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? "bottom" : "right"}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-sm text-left'>
                  <Avatar className='rounded-lg size-8'>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className='rounded-lg'>
                      {fallbackName}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 grid text-sm text-left leading-tight'>
                    <span className='font-medium truncate'>{user.name}</span>
                    <span className='text-muted-foreground text-xs truncate'>
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='hover:cursor-pointer'
              disabled={isLogoutPending}
              onClick={logoutCurrentUser}
            >
              <LogOutIcon className='text-destructive' />

              {isLogoutPending ? (
                <LoadingSpinner
                  spinnerClassName='text-brand'
                  textClassName='text-brand'
                  text='Logging out'
                  shimmer
                />
              ) : (
                <span className='text-destructive'>Logout</span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
