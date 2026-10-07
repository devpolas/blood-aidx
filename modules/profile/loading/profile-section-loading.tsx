import type { LucideIcon } from "lucide-react";
import { Heading3 } from "@/components/typography/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileSkeleton, ProfileSkeletonItem } from "./profile-skeleton";
interface ProfileSectionLoadingProps {
  icon: LucideIcon;
  title: string;
  count: number;
  wide?: boolean;
}
export function ProfileSectionLoading({
  icon: Icon,
  title,
  count,
  wide = false,
}: ProfileSectionLoadingProps) {
  return (
    <Card className={wide ? "lg:col-span-2" : undefined}>
      <CardHeader className='gap-1 p-5 sm:p-6'>
        <div className='flex items-center gap-2'>
          <Icon className='size-5 text-brand/60 shrink-0' />
          <Heading3 className='text-lg sm:text-xl'> {title} </Heading3>
        </div>
        <ProfileSkeleton className='mt-1 w-60 max-w-full h-4' />
      </CardHeader>
      <Separator className='mx-4 sm:mx-6 w-auto' />
      <CardContent className='gap-5 grid sm:grid-cols-2 p-5 sm:p-6'>
        {Array.from({ length: count }, (_, index) => (
          <ProfileSkeletonItem key={index} />
        ))}
      </CardContent>
    </Card>
  );
}
