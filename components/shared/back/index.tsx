"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      type='button'
      variant='ghost'
      className='gap-2 text-xs'
      onClick={() => router.back()}
    >
      <ArrowLeft className='size-4 text-brand' />
      <span>Go back</span>
    </Button>
  );
}
