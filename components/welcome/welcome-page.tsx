"use client";

import { useEffect, useState } from "react";
import { HeartPulse } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { Card, CardContent } from "@/components/ui/card";
import {
  useAuth,
  useCurrentUser,
  useMyDonorProfile,
  useMyLocation,
  useMyProfile,
  useProfileCompletion,
} from "@/hooks";
import { getSafeCallbackUrl } from "@/utils/callback.url";

import { DonorStep } from "./donor-step";
import { LocationStep } from "./location-step";
import { PersonalStep } from "./personal-step";
import { WelcomeProgress } from "./welcome-progress";

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { data: userResponse, isPending: isUserLoading } = useCurrentUser();
  const { data: profileResponse, isPending: isProfileLoading } = useMyProfile();
  const { data: donorResponse, isPending: isDonorLoading } =
    useMyDonorProfile();
  const { data: locationResponse, isPending: isLocationLoading } =
    useMyLocation();

  const {
    isComplete,
    requiresProfileSetup,
    isLoading: isCompletionLoading,
    steps,
  } = useProfileCompletion();

  const [currentStep, setCurrentStep] = useState(1);

  const user = userResponse?.data?.user;
  const profile = profileResponse?.data?.profile;
  const donor = donorResponse?.data?.donor;
  const location = locationResponse?.data?.location;

  const isLoading =
    isAuthLoading ||
    isUserLoading ||
    isProfileLoading ||
    isDonorLoading ||
    isLocationLoading ||
    isCompletionLoading;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      const target = callbackUrl || "/dashboard";

      router.replace(`/signin?callbackUrl=${encodeURIComponent(target)}`);

      return;
    }

    if (!requiresProfileSetup || isComplete) {
      router.replace(callbackUrl || "/dashboard");
    }
  }, [
    isLoading,
    isAuthenticated,
    user,
    requiresProfileSetup,
    isComplete,
    callbackUrl,
    router,
  ]);

  useEffect(() => {
    if (isLoading || !user || !requiresProfileSetup || isComplete) {
      return;
    }

    if (!steps.personal) {
      setCurrentStep(1);
      return;
    }

    if (!steps.donor) {
      setCurrentStep(2);
      return;
    }

    if (!steps.location) {
      setCurrentStep(3);
    }
  }, [isLoading, user, requiresProfileSetup, isComplete, steps]);

  function handleComplete() {
    router.replace(callbackUrl || "/dashboard");
  }

  if (
    isLoading ||
    !isAuthenticated ||
    !user ||
    !requiresProfileSetup ||
    isComplete
  ) {
    return <Loading />;
  }

  return (
    <section className='bg-background px-4 py-8 sm:py-12 min-h-screen'>
      <div className='mx-auto w-full max-w-4xl'>
        <div className='mb-8 sm:mb-10 text-center'>
          <div className='flex justify-center items-center bg-brand/10 mx-auto mb-5 rounded-2xl size-14 text-brand'>
            <HeartPulse className='size-7' />
          </div>

          <h1 className='font-bold text-3xl sm:text-4xl tracking-tight'>
            Welcome to Blood AidX
          </h1>

          <p className='mx-auto mt-3 max-w-2xl text-muted-foreground text-sm sm:text-base leading-6'>
            Let&apos;s complete your profile so you can discover donors, respond
            to blood requests, and help save lives.
          </p>
        </div>

        <div className='mb-8'>
          <WelcomeProgress currentStep={currentStep} completedSteps={steps} />
        </div>

        <Card className='shadow-sm border-border/60 overflow-hidden'>
          <CardContent className='p-5 sm:p-8'>
            {currentStep === 1 && (
              <PersonalStep
                user={user}
                profile={profile}
                onComplete={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <DonorStep
                donor={donor}
                onBack={() => setCurrentStep(1)}
                onComplete={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 3 && (
              <LocationStep
                location={location}
                onBack={() => setCurrentStep(2)}
                onComplete={handleComplete}
              />
            )}
          </CardContent>
        </Card>

        <p className='mt-6 text-muted-foreground text-xs text-center leading-5'>
          Your information helps Blood AidX connect people with the right blood
          support.
        </p>
      </div>
    </section>
  );
}
