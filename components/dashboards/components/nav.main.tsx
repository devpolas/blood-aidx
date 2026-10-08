"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip='Make a Blood Request'
              className='bg-sidebar-primary data-[active=true]:bg-sidebar-primary hover:bg-sidebar-primary/90 active:bg-sidebar-primary/85 shadow-sm hover:shadow-md hover:shadow-sidebar-primary/20 border border-sidebar-primary/80 focus-visible:ring-2 focus-visible:ring-sidebar-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar text-sidebar-primary-foreground data-[active=true]:text-sidebar-primary-foreground hover:text-sidebar-primary-foreground active:text-sidebar-primary-foreground active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-200 ease-out'
              render={
                <Link
                  href='/dashboard/blood-request'
                  className='flex items-center gap-2 w-full'
                >
                  <PlusCircleIcon className='size-4 shrink-0' />
                  <span className='font-medium truncate'>
                    Make a Blood Request
                  </span>
                </Link>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className='font-medium text-base'
                render={
                  <Link href={item.url}>
                    <span className='text-brand'>{item.icon}</span>
                    <span className='text-muted-foreground'>{item.title}</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
