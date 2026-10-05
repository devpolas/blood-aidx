"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import Logo from "@/components/logo/logo";
import { ThemeSwitcher } from "@/components/shared/theme/theme.switcher";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  menu: {
    navMain: {
      title: string;
      url: string;
      icon: React.ReactNode;
    }[];

    navSecondary: {
      title: string;
      url: string;
      icon: React.ReactNode;
    }[];
  };

  user: {
    name: string;
    email: string;
    avatar?: string | null;
  };
}

export function AppSidebar({ menu, user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='flex flex-row justify-between'>
            <SidebarMenuButton
              className='data-[slot=sidebar-menu-button]:p-1.5!'
              render={<Logo />}
            />
            <SidebarMenuButton
              className='data-[slot=sidebar-menu-button]:p-1.5!'
              render={<ThemeSwitcher />}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu.navMain} />
        <NavSecondary items={menu.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
