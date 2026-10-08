"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { Check, LocateFixed } from "lucide-react";
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
import { useGeoLocation, useUpdateMyLocation } from "@/hooks";

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

  const {
    getPosition,
    isLoading: isDetectingLocation,
    locationPayload,
    error: locationError,
  } = useGeoLocation();

  const isSaving = isUpdatingLocation || isDetectingLocation;

  const form = useForm({
    defaultValues: {
      latitude: location?.latitude ?? "",
      longitude: location?.longitude ?? "",
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
    if (!locationPayload) return;

    form.setFieldValue("latitude", locationPayload.latitude);
    form.setFieldValue("longitude", locationPayload.longitude);
    form.setFieldValue("country", locationPayload.country);
    form.setFieldValue("division", locationPayload.division);
    form.setFieldValue("district", locationPayload.district);
    form.setFieldValue("city", locationPayload.city);
    form.setFieldValue("village", locationPayload.village);
    form.setFieldValue("postalCode", locationPayload.postalCode);
    form.setFieldValue("addressLine", locationPayload.addressLine ?? "");
  }, [locationPayload, form]);

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

        <div className='bg-brand/5 p-4 border border-brand/20 rounded-xl'>
          <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4'>
            <div className='min-w-0'>
              <p className='font-medium text-foreground'>
                Find your location automatically
              </p>

              <p className='mt-1 text-muted-foreground text-xs leading-5'>
                Detect your current location and we&apos;ll fill in the form.
                You can review everything before saving.
              </p>
            </div>

            <Button
              type='button'
              variant='outline'
              disabled={isSaving}
              onClick={getPosition}
              className='hover:bg-brand/10 border-brand/30 text-brand cursor-pointer shrink-0'
            >
              {isDetectingLocation ? (
                <LoadingSpinner
                  spinnerClassName='text-brand'
                  textClassName='text-brand'
                  text='Detecting'
                  shimmer
                />
              ) : (
                <>
                  <LocateFixed className='size-4' />
                  Detect location
                </>
              )}
            </Button>
          </div>

          {locationError && (
            <p className='mt-3 text-destructive text-sm'>{locationError}</p>
          )}

          {locationPayload && !locationError && (
            <p className='flex items-center gap-1.5 mt-3 font-medium text-brand text-xs'>
              <Check className='size-3.5' />
              Location detected. Please review the information below.
            </p>
          )}
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
                  disabled={isSaving}
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
                  disabled={isSaving}
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
                  disabled={isSaving}
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
                  disabled={isSaving}
                />
              )}
            </form.Field>

            <form.Field
              name='village'
              validators={{
                onSubmit: ({ value }) =>
                  !value.trim() ? "Village / Area is required" : undefined,
              }}
            >
              {(field) => (
                <FormInput
                  field={field}
                  label='Village / Area'
                  placeholder='Enter village or area'
                  isRequired
                  disabled={isSaving}
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
                  disabled={isSaving}
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
                disabled={isSaving}
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
