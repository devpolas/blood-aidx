import type { CSSProperties, ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboards/components/app-sidebar";
import { SiteHeader } from "@/components/dashboards/components/site-header";

const dashboardStyle = {
  "--sidebar-width": "calc(var(--spacing) * 72)",
  "--header-height": "calc(var(--spacing) * 12)",
} as CSSProperties;

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider style={dashboardStyle}>
      <AppSidebar variant='inset' />
      <SidebarInset className='min-w-0'>
        <SiteHeader />
        <main className='px-4 md:px-6 py-4 w-full'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
