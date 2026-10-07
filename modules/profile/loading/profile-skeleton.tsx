import { cn } from "@/lib/utils";

interface ProfileSkeletonProps {
  className?: string;
}

export function ProfileSkeleton({ className }: ProfileSkeletonProps) {
  return (
    <div
      aria-hidden='true'
      className={cn("bg-muted rounded-md animate-pulse", className)}
    />
  );
}

export function ProfileSkeletonItem() {
  return (
    <div className='flex gap-3 min-w-0'>
      <ProfileSkeleton className='bg-brand/10 rounded-lg size-9 shrink-0' />

      <div className='flex-1 space-y-2 min-w-0'>
        <ProfileSkeleton className='w-16 h-3' />
        <ProfileSkeleton className='w-28 max-w-full h-5' />
      </div>
    </div>
  );
}
