"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowLeft, ArrowRight, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { FormRadioGroup } from "@/components/forms/components/form.radio.group";
import { AVAILABILITY_OPTIONS, BLOOD_GROUP_OPTIONS } from "@/config";
import { useUpdateMyDonorProfile } from "@/hooks";
import { DonorProfile } from "@/types/donor.profile";

type DonorStepProps = {
  donor?: DonorProfile;
  disabled?: boolean;
  onBack: () => void;
  onComplete: () => void;
};

export function DonorStep({
  donor,
  disabled = false,
  onBack,
  onComplete,
}: DonorStepProps) {
  const { mutateAsync: updateDonor, isPending: isUpdatingDonor } =
    useUpdateMyDonorProfile();

  const isSaving = disabled || isUpdatingDonor;

  const form = useForm({
    defaultValues: {
      bloodGroup: donor?.bloodGroup,
      availability: donor?.availability,
    },

    onSubmit: async ({ value }) => {
      await updateDonor({
        bloodGroup: value.bloodGroup,
        availability: value.availability,
      });

      onComplete();
    },
  });

  return (
    <div className='space-y-7'>
      <div>
        <p className='font-medium text-brand text-sm'>Step 2 of 3</p>

        <h2 className='flex items-center gap-2 mt-1 font-bold text-2xl tracking-tight'>
          <HeartPulse className='size-6 text-brand' />
          Your donor information
        </h2>

        <p className='mt-2 max-w-xl text-muted-foreground text-sm leading-6'>
          This information helps Blood AidX understand when and where you can
          help someone in need.
        </p>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          void form.handleSubmit();
        }}
        className='space-y-7'
      >
        <form.Field
          name='bloodGroup'
          validators={{
            onSubmit: ({ value }) =>
              !value ? "Blood group is required" : undefined,
          }}
        >
          {(field) => (
            <FormRadioGroup
              field={field}
              label='Blood Group'
              options={BLOOD_GROUP_OPTIONS}
              isRequired
              disabled={isSaving}
              orientation='horizontal'
              className='gap-3 grid grid-cols-2 sm:grid-cols-4'
            />
          )}
        </form.Field>

        <form.Field
          name='availability'
          validators={{
            onSubmit: ({ value }) =>
              !value ? "Donation availability is required" : undefined,
          }}
        >
          {(field) => (
            <FormRadioGroup
              field={field}
              label='Donation Availability'
              options={AVAILABILITY_OPTIONS}
              isRequired
              disabled={isSaving}
            />
          )}
        </form.Field>

        <div className='flex justify-between items-center gap-3 pt-2'>
          <Button
            type='button'
            variant='outline'
            disabled={isSaving}
            onClick={onBack}
            className='cursor-pointer'
          >
            <ArrowLeft className='size-4' />
            Back
          </Button>

          <Button
            type='submit'
            disabled={isSaving}
            className='font-medium cursor-pointer glass-brand'
            variant='destructive'
          >
            {isSaving ? (
              <LoadingSpinner
                spinnerClassName='text-brand'
                textClassName='text-brand'
                text='Saving'
                shimmer
              />
            ) : (
              <>
                Continue
                <ArrowRight className='size-4' />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
