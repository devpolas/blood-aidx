"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Logo from "@/components/logo/logo";
import { ThemeSwitcher } from "@/components/shared/theme/theme.switcher";

import useAuth from "@/hooks/use-auth";
import { getDashboardMenu } from "@/config";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { SidebarSkeleton, SidebarUserSkeleton } from "./dashboard-skeleton";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoading } = useAuth();

  const menu = user ? getDashboardMenu(user.role) : null;

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center'>
            <div className='flex-1 min-w-0'>
              <Logo />
            </div>

            <ThemeSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='py-4'>
        {isLoading ? (
          <SidebarSkeleton />
        ) : menu ? (
          <>
            <NavMain items={menu.navMain} />
            <NavSecondary items={menu.navSecondary} className='mt-auto' />
          </>
        ) : null}
      </SidebarContent>

      <SidebarFooter>
        {isLoading ? (
          <SidebarUserSkeleton />
        ) : user ? (
          <NavUser user={user} />
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}
