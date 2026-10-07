"use client";

import { useForm } from "@tanstack/react-form";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { FormDatePicker } from "@/components/forms/components/form.date.picker";
import { FormInput } from "@/components/forms/components/form.input";
import { FormRadioGroup } from "@/components/forms/components/form.radio.group";
import { GENDERS } from "@/config";
import { useUpdateCurrentUser, useUpdateMyProfile } from "@/hooks";
import { Gender } from "@/types/enum";
import { User } from "@/types/user";
import { UserProfile } from "@/types/user.profile";

type PersonalStepProps = {
  user?: User;
  profile?: UserProfile;
  disabled?: boolean;
  onComplete: () => void;
};

const normalizeGender = (
  gender: Gender | null | undefined,
): "male" | "female" | "other" | undefined => {
  if (gender === "male" || gender === "female" || gender === "other") {
    return gender;
  }

  return undefined;
};

export function PersonalStep({
  user,
  profile,
  disabled = false,
  onComplete,
}: PersonalStepProps) {
  const { mutateAsync: updateCurrentUser, isPending: isUpdatingUser } =
    useUpdateCurrentUser();

  const { mutateAsync: updateMyProfile, isPending: isUpdatingProfile } =
    useUpdateMyProfile();

  const isSaving = disabled || isUpdatingUser || isUpdatingProfile;

  const form = useForm({
    defaultValues: {
      name: user?.name ?? "",
      gender: normalizeGender(user?.gender),
      phone: profile?.phone ?? "",
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth)
        : undefined,
    },

    onSubmit: async ({ value }) => {
      await updateCurrentUser({
        name: value.name.trim(),
        gender: value.gender,
      });

      await updateMyProfile({
        phone: value.phone.trim(),
        dateOfBirth: value.dateOfBirth?.toISOString() ?? null,
      });

      onComplete();
    },
  });

  return (
    <div className='space-y-7'>
      <div>
        <p className='font-medium text-brand text-sm'>Step 1 of 3</p>

        <h2 className='mt-1 font-bold text-2xl tracking-tight'>
          Tell us about yourself
        </h2>

        <p className='mt-2 max-w-xl text-muted-foreground text-sm leading-6'>
          Add your basic information so people know who they are connecting
          with.
        </p>
      </div>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();

          void form.handleSubmit();
        }}
        className='space-y-5'
      >
        <form.Field
          name='name'
          validators={{
            onSubmit: ({ value }) => {
              const name = value.trim();

              if (!name) {
                return "Full name is required";
              }

              if (name.length < 2) {
                return "Full name must be at least 2 characters";
              }

              return undefined;
            },
          }}
        >
          {(field) => (
            <FormInput
              field={field}
              label='Full Name'
              placeholder='Enter your full name'
              isRequired
              disabled={isSaving}
              autoComplete='name'
            />
          )}
        </form.Field>

        <form.Field
          name='gender'
          validators={{
            onSubmit: ({ value }) =>
              !value ? "Gender is required" : undefined,
          }}
        >
          {(field) => (
            <FormRadioGroup
              field={field}
              label='Gender'
              options={GENDERS}
              isRequired
              disabled={isSaving}
              orientation='horizontal'
            />
          )}
        </form.Field>

        <form.Field
          name='phone'
          validators={{
            onSubmit: ({ value }) => {
              const phone = value.trim();

              if (!phone) {
                return "Phone number is required";
              }

              if (phone.length < 7) {
                return "Phone number must be at least 7 characters";
              }

              if (phone.length > 20) {
                return "Phone number must not exceed 20 characters";
              }

              return undefined;
            },
          }}
        >
          {(field) => (
            <FormInput
              field={field}
              label='Phone Number'
              placeholder='Enter your phone number'
              isRequired
              disabled={isSaving}
              autoComplete='tel'
            />
          )}
        </form.Field>

        <form.Field
          name='dateOfBirth'
          validators={{
            onSubmit: ({ value }) => {
              if (!value) {
                return "Date of birth is required";
              }

              if (Number.isNaN(value.getTime())) {
                return "Please select a valid date of birth";
              }

              if (value > new Date()) {
                return "Date of birth cannot be in the future";
              }

              return undefined;
            },
          }}
        >
          {(field) => (
            <FormDatePicker
              field={field}
              label='Date of Birth'
              placeholder='Select your date of birth'
              isRequired
              disabled={isSaving}
            />
          )}
        </form.Field>

        <div className='flex justify-end pt-2'>
          <Button
            variant='destructive'
            type='submit'
            disabled={isSaving}
            className='font-medium cursor-pointer glass-brand'
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
