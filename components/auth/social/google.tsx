"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { Button } from "@/components/ui/button";

export default function ContinueWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);
  const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/social/google`;
  const handleGoogleAuth = () => {
    setIsLoading(true);
    window.location.href = googleAuthUrl;
  };

  return (
    <Button
      type='button'
      disabled={isLoading}
      onClick={handleGoogleAuth}
      className={
        "glass-brand text-brand w-full font-medium hover:cursor-pointer hover:bg-brand-foreground"
      }
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
