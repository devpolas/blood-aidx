import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className='flex h-(--header-height) w-full rounded shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex items-center gap-1 px-4 w-full'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mt-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='ml-1 font-bold text-brand text-base'>Dashboard</h1>
      </div>
    </header>
  );
}
