"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import type { DonorProfile } from "@/types/donor.profile";
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
import { FormRadioGroup } from "@/components/forms/components/form.radio.group";
import { AVAILABILITY_OPTIONS, BLOOD_GROUP_OPTIONS } from "@/config";
import { useUpdateMyDonorProfile } from "@/hooks";

interface EditDonorInformationDialogProps {
  donor: DonorProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditDonorInformationDialog({
  donor,
  open,
  onOpenChange,
}: EditDonorInformationDialogProps) {
  const { mutateAsync: updateDonorProfile, isPending: isUpdatingDonor } =
    useUpdateMyDonorProfile();

  const form = useForm({
    defaultValues: {
      bloodGroup: donor.bloodGroup,
      availability: donor.availability,
    },
    onSubmit: async ({ value }) => {
      await updateDonorProfile({
        bloodGroup: value.bloodGroup,
        availability: value.availability,
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
          <DialogTitle>Edit Donor Information</DialogTitle>
          <DialogDescription>
            Keep your blood group and donation availability up to date.
          </DialogDescription>
        </DialogHeader>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className='space-y-6'
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
                disabled={isUpdatingDonor}
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
                disabled={isUpdatingDonor}
              />
            )}
          </form.Field>

          <div className='bg-brand/5 p-3 border border-brand/20 rounded-lg'>
            <p className='text-muted-foreground text-xs leading-5'>
              Please make sure your blood group is accurate. This information is
              important when connecting you with blood requests.
            </p>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isUpdatingDonor}
              className='cursor-pointer'
            >
              Cancel
            </Button>

            <Button
              type='submit'
              disabled={isUpdatingDonor}
              className='cursor-pointer'
            >
              {isUpdatingDonor ? (
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
