"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import type { User } from "@/types/user";
import type { UserProfile } from "@/types/user.profile";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { FormDatePicker } from "@/components/forms/components/form.date.picker";
import { FormInput } from "@/components/forms/components/form.input";
import { FormRadioGroup } from "@/components/forms/components/form.radio.group";
import { FormTextarea } from "@/components/forms/components/form.textarea";
import { GENDERS } from "@/config";
import { useUpdateCurrentUser, useUpdateMyProfile } from "@/hooks";

interface EditPersonalInformationDialogProps {
  user: User;
  profile?: UserProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const normalizeGender = (
  gender: User["gender"],
): "male" | "female" | "other" | undefined => {
  if (gender === "male" || gender === "female" || gender === "other") {
    return gender;
  }

  return undefined;
};

export function EditPersonalInformationDialog({
  user,
  profile,
  open,
  onOpenChange,
}: EditPersonalInformationDialogProps) {
  const { mutateAsync: updateCurrentUser, isPending: isUpdatingUser } =
    useUpdateCurrentUser();

  const { mutateAsync: updateMyProfile, isPending: isUpdatingProfile } =
    useUpdateMyProfile();

  const isSaving = isUpdatingUser || isUpdatingProfile;

  const form = useForm({
    defaultValues: {
      name: user.name ?? "",
      gender: normalizeGender(user.gender),
      phone: profile?.phone ?? "",
      dateOfBirth: profile?.dateOfBirth
        ? new Date(profile.dateOfBirth)
        : undefined,
      bio: profile?.bio ?? "",
    },
    onSubmit: async ({ value }) => {
      await updateCurrentUser({
        name: value.name.trim(),
        gender: value.gender,
      });

      await updateMyProfile({
        phone: value.phone.trim() || null,
        dateOfBirth: value.dateOfBirth?.toISOString() ?? null,
        bio: value.bio.trim() || null,
      });

      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
          <DialogDescription>
            Update your personal and contact information.
          </DialogDescription>
        </DialogHeader>

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

                if (!name) return "Full name is required";
                if (name.length < 2) {
                  return "Full name must be at least 2 characters";
                }

                if (name.length > 100) {
                  return "Full name must not exceed 100 characters";
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

                if (phone.length > 20) {
                  return "Phone number must not exceed 20 characters";
                }

                if (phone && phone.length < 7) {
                  return "Phone number must be at least 7 characters";
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
                disabled={isSaving}
                autoComplete='tel'
              />
            )}
          </form.Field>

          <form.Field
            name='dateOfBirth'
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return undefined;

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
                disabled={isSaving}
              />
            )}
          </form.Field>

          <form.Field
            name='bio'
            validators={{
              onSubmit: ({ value }) => {
                if (value.length > 1000) {
                  return "Bio must not exceed 1000 characters";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <FormTextarea
                field={field}
                label='Bio'
                placeholder='Tell people a little about yourself'
                disabled={isSaving}
                height={120}
              />
            )}
          </form.Field>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
              className='cursor-pointer'
            >
              Cancel
            </Button>

            <Button
              type='submit'
              disabled={isSaving}
              className='cursor-pointer'
            >
              {isSaving ? (
                <LoadingSpinner
                  spinnerClassName='text-brand'
                  textClassName='text-brand'
                  text='Saving'
                  shimmer
                />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
