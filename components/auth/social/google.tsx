"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { Button } from "@/components/ui/button";
import { saveCallbackUrl } from "@/utils/callback.url";

export default function ContinueWithGoogle() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social/google`;
  const callbackUrl = searchParams.get("callbackUrl");

  const handleGoogleAuth = () => {
    if (callbackUrl) {
      saveCallbackUrl(callbackUrl);
    }
    setIsLoading(true);
    window.location.href = googleAuthUrl;
  };

  return (
    <Button
      type='button'
      disabled={isLoading}
      onClick={handleGoogleAuth}
      className='hover:bg-brand-foreground w-full font-medium text-brand hover:cursor-pointer glass-brand'
      aria-label='Continue with Google'
    >
      {isLoading ? (
        <LoadingSpinner
          spinnerClassName='text-brand'
          textClassName='text-brand'
          text='Continue with Google'
          shimmer
        />
      ) : (
        <>
          <FcGoogle className='size-4' aria-hidden='true' />

          <span className='font-medium text-brand'>Continue with Google</span>
        </>
      )}
    </Button>
  );
}
