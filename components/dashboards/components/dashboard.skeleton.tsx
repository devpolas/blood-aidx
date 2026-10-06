import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const mainItems = [
  "w-28",
  "w-36",
  "w-24",
  "w-32",
  "w-28",
  "w-36",
  "w-24",
  "w-32",
  "w-28",
  "w-36",
  "w-28",
  "w-24",
];

const secondaryItems = ["w-28", "w-36", "w-24", "w-32"];

export function SidebarSkeleton() {
  return (
    <div className='flex flex-col h-full'>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {mainItems.map((width, index) => (
              <SidebarMenuItem key={`main-${index}`}>
                <SidebarMenuButton
                  disabled
                  className='hover:bg-transparent font-medium text-base'
                >
                  {/* Icon — mirrors text-brand */}
                  <Skeleton
                    className={[
                      "size-4 shrink-0 rounded-md",
                      index === 0 ? "bg-brand/25" : "bg-brand/10",
                    ].join(" ")}
                  />

                  {/* Label — mirrors text-muted-foreground */}
                  <Skeleton
                    className={`h-4 ${width} rounded-md bg-muted-foreground/15`}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className='mt-auto'>
        <SidebarGroupContent>
          <SidebarMenu>
            {secondaryItems.map((width, index) => (
              <SidebarMenuItem key={`secondary-${index}`}>
                <SidebarMenuButton
                  disabled
                  className='hover:bg-transparent font-medium text-base'
                >
                  {/* Icon */}
                  <Skeleton className='bg-brand/10 rounded-md size-4 shrink-0' />

                  {/* Label */}
                  <Skeleton
                    className={`h-4 ${width} rounded-md bg-muted-foreground/15`}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
}

export function SidebarUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          disabled
          size='lg'
          className='hover:bg-transparent font-medium text-base'
        >
          {/* Avatar — branded */}
          <Skeleton className='bg-brand/15 rounded-lg size-8 shrink-0' />

          {/* User name + email */}
          <div className='flex-1 gap-1.5 grid min-w-0 text-left'>
            <Skeleton className='bg-muted-foreground/15 rounded-md w-24 h-4' />

            <Skeleton className='bg-muted-foreground/10 rounded-md w-32 h-3' />
          </div>

          {/* More icon */}
          <Skeleton className='bg-muted-foreground/10 ml-auto rounded-sm size-4' />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
