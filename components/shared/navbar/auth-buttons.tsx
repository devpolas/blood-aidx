import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <div className='hidden lg:flex items-center gap-1'>
      <Button
        size='sm'
        variant='outline'
        nativeButton={false}
        render={<Link href='/signin'>Sign In</Link>}
      />
      <Button
        size='sm'
        variant='destructive'
        nativeButton={false}
        render={<Link href='/signup'>Get Started</Link>}
      />
    </div>
  );
}
