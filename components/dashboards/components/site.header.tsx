import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-30 flex h-(--header-height) w-full shrink-0 items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80'>
      <div className='flex items-center gap-2 px-3 sm:px-4 w-full min-w-0 h-full'>
        <SidebarTrigger
          className='size-8 shrink-0'
          aria-label='Toggle sidebar'
        />

        <Separator
          orientation='vertical'
          className='bg-brand/40 mx-2 my-auto h-4 shrink-0'
        />

        <div className='flex flex-1 items-center min-w-0'>
          <h1 className='font-semibold text-brand text-sm sm:text-base truncate'>
            Dashboard
          </h1>
        </div>
      </div>
    </header>
  );
}
