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
import { useAuth } from "@/hooks";
import type { User } from "@/types/user";
import { getInitials } from "@/utils/initials.helper";
import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavUserProps {
  user: User;
}

export function NavUser({ user }: NavUserProps) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { logout, isLogoutPending, refreshUser } = useAuth();

  async function logoutCurrentUser() {
    await logout();
    await refreshUser();
    router.replace("/signin");
  }

  const fallbackName = getInitials(user.name);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
              >
                <Avatar className='rounded-lg size-8'>
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className='bg-background rounded-lg'>
                    {fallbackName}
                  </AvatarFallback>
                </Avatar>

                <div className='flex-1 grid min-w-0 text-sm text-left leading-tight'>
                  <span className='font-medium truncate'>{user.name}</span>
                  <span className='text-muted-foreground text-xs truncate'>
                    {user.email}
                  </span>
                </div>

                <EllipsisVerticalIcon className='ml-auto size-4 shrink-0' />
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
                    <AvatarImage src={user.image ?? ""} alt={user.name} />
                    <AvatarFallback className='bg-background rounded-lg'>
                      {fallbackName}
                    </AvatarFallback>
                  </Avatar>

                  <div className='flex-1 grid min-w-0 text-sm text-left leading-tight'>
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
              className='cursor-pointer'
              disabled={isLogoutPending}
              onClick={logoutCurrentUser}
            >
              {isLogoutPending ? (
                <LoadingSpinner
                  spinnerClassName='text-brand'
                  textClassName='text-brand'
                  text='Logging out'
                  shimmer
                />
              ) : (
                <>
                  <LogOutIcon className='text-destructive' />
                  <span className='text-destructive'>Logout</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
