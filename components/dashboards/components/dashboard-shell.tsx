"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardLoader from "./dashboard-loader";
import useAuth from "@/hooks/use-auth";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { useDashboardMenu } from "@/hooks/use-dashboard-routes";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const menu = useDashboardMenu();

  if (isLoading || !user || !menu) {
    return <DashboardLoader />;
  }
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar menu={menu} user={user} variant='inset' />
      <SidebarInset className='w-full min-w-0'>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
