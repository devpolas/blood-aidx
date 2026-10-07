"use client";

import * as React from "react";
import { Check, HeartPulse, MapPin, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

type WelcomeProgressProps = {
  currentStep: number;
  completedSteps: {
    personal: boolean;
    donor: boolean;
    location: boolean;
  };
};

const steps = [
  {
    id: 1,
    title: "Personal",
    description: "Your basic information",
    icon: UserRound,
  },
  {
    id: 2,
    title: "Donor",
    description: "Your blood information",
    icon: HeartPulse,
  },
  {
    id: 3,
    title: "Location",
    description: "Your location",
    icon: MapPin,
  },
];

export function WelcomeProgress({
  currentStep,
  completedSteps,
}: WelcomeProgressProps) {
  const completedCount = [
    completedSteps.personal,
    completedSteps.donor,
    completedSteps.location,
  ].filter(Boolean).length;

  const progressCount = Math.max(completedCount, currentStep - 1);
  const percentage = Math.round((progressCount / steps.length) * 100);

  return (
    <div className='space-y-5'>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-medium text-brand text-sm'>Profile setup</p>
          <p className='text-muted-foreground text-xs'>
            {progressCount} of {steps.length} sections completed
          </p>
        </div>

        <span className='font-semibold text-brand text-sm'>{percentage}%</span>
      </div>

      <div
        className='bg-muted rounded-full h-1.5 overflow-hidden'
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className='bg-brand rounded-full h-full transition-all duration-500'
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className='flex items-start'>
        {steps.map((step, index) => {
          const Icon = step.icon;

          const isCurrent = currentStep === step.id;

          const isCompleted =
            step.id === 1
              ? completedSteps.personal
              : step.id === 2
                ? completedSteps.donor
                : completedSteps.location;

          const isConnectorCompleted =
            index < steps.length - 1 && step.id < currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className='flex flex-col items-center min-w-0'>
                <div
                  className={cn(
                    "flex justify-center items-center border-2 rounded-full size-10 transition-all duration-300 shrink-0",
                    isCompleted &&
                      "border-brand bg-brand text-brand-foreground",
                    !isCompleted &&
                      isCurrent &&
                      "border-brand bg-brand/10 text-brand",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted bg-background text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <Check className='size-4' />
                  ) : (
                    <Icon className='size-4' />
                  )}
                </div>

                <div className='mt-2 text-center'>
                  <p
                    className={cn(
                      "font-semibold text-xs sm:text-sm",
                      isCurrent || isCompleted
                        ? "text-brand"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>

                  <p className='hidden sm:block mt-0.5 text-muted-foreground text-xs whitespace-nowrap'>
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 mx-2 mt-5 min-w-4 h-0.5 transition-colors duration-500",
                    isConnectorCompleted ? "bg-brand" : "bg-muted",
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
