"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import type { Location } from "@/types/location";
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
import { FormInput } from "@/components/forms/components/form.input";
import { useUpdateMyLocation } from "@/hooks";

interface EditLocationDialogProps {
  location?: Location;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditLocationDialog({
  location,
  open,
  onOpenChange,
}: EditLocationDialogProps) {
  const { mutateAsync: updateLocation, isPending: isUpdatingLocation } =
    useUpdateMyLocation();

  const form = useForm({
    defaultValues: {
      country: location?.country ?? "",
      division: location?.division ?? "",
      district: location?.district ?? "",
      city: location?.city ?? "",
      village: location?.village ?? "",
      postalCode: location?.postalCode ?? "",
      addressLine: location?.addressLine ?? "",
    },
    onSubmit: async ({ value }) => {
      await updateLocation({
        country: value.country.trim(),
        division: value.division.trim(),
        district: value.district.trim(),
        city: value.city.trim(),
        village: value.village.trim(),
        postalCode: value.postalCode.trim(),
        addressLine: value.addressLine.trim() || undefined,
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
          <DialogTitle>Edit Location</DialogTitle>
          <DialogDescription>
            Update your registered location and address.
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
          <div className='gap-5 grid sm:grid-cols-2'>
            <form.Field
              name='country'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Country is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='Country'
                  placeholder='Enter country'
                  isRequired
                  disabled={isUpdatingLocation}
                />
              )}
            </form.Field>

            <form.Field
              name='division'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Division is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='Division'
                  placeholder='Enter division'
                  isRequired
                  disabled={isUpdatingLocation}
                />
              )}
            </form.Field>

            <form.Field
              name='district'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "District is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='District'
                  placeholder='Enter district'
                  isRequired
                  disabled={isUpdatingLocation}
                />
              )}
            </form.Field>

            <form.Field
              name='city'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "City is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='City'
                  placeholder='Enter city'
                  isRequired
                  disabled={isUpdatingLocation}
                />
              )}
            </form.Field>

            <form.Field
              name='village'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Village is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='Village'
                  placeholder='Enter village'
                  isRequired
                  disabled={isUpdatingLocation}
                />
              )}
            </form.Field>

            <form.Field
              name='postalCode'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Postal code is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='Postal Code'
                  placeholder='Enter postal code'
                  isRequired
                  disabled={isUpdatingLocation}
                />
              )}
            </form.Field>
          </div>

          <form.Field name='addressLine'>
            {(field) => (
              <FormInput
                field={field}
                label='Address'
                placeholder='Street address (optional)'
                disabled={isUpdatingLocation}
              />
            )}
          </form.Field>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
              disabled={isUpdatingLocation}
              className='cursor-pointer'
            >
              Cancel
            </Button>

            <Button
              type='submit'
              disabled={isUpdatingLocation}
              className='cursor-pointer'
            >
              {isUpdatingLocation ? (
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
