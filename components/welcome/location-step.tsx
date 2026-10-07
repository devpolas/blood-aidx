"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft, Check, LocateFixed, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { FormInput } from "@/components/forms/components/form.input";

import {
  useCreateLocation,
  useGeoLocation,
  useUpdateMyLocation,
} from "@/hooks";

import { Location } from "@/types/location";

type LocationStepProps = {
  location?: Location;
  disabled?: boolean;
  onBack: () => void;
  onComplete: () => void;
};

export function LocationStep({
  location,
  disabled = false,
  onBack,
  onComplete,
}: LocationStepProps) {
  const { mutateAsync: createLocation, isPending: isCreatingLocation } =
    useCreateLocation();

  const { mutateAsync: updateLocation, isPending: isUpdatingLocation } =
    useUpdateMyLocation();

  const {
    getPosition,
    isLoading: isDetectingLocation,
    locationPayload,
    error: locationError,
  } = useGeoLocation();

  const isSaving = disabled || isCreatingLocation || isUpdatingLocation;

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
      const payload = {
        latitude: value.latitude.trim(),
        longitude: value.longitude.trim(),
        country: value.country.trim(),
        division: value.division.trim(),
        district: value.district.trim(),
        city: value.city.trim(),
        village: value.village.trim(),
        postalCode: value.postalCode.trim(),
        addressLine: value.addressLine.trim(),
      };

      if (location) {
        await updateLocation(payload);
      } else {
        await createLocation(payload);
      }

      onComplete();
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

  return (
    <div className='space-y-7'>
      <div>
        <p className='font-medium text-brand text-sm'>Step 3 of 3</p>

        <h2 className='flex items-center gap-2 mt-1 font-bold text-2xl tracking-tight'>
          <MapPin className='size-6 text-brand' />
          Where are you located?
        </h2>

        <p className='mt-2 max-w-xl text-muted-foreground text-sm leading-6'>
          Your location helps Blood AidX connect you with relevant blood support
          nearby.
        </p>
      </div>

      <div className='bg-brand/5 p-4 border border-brand/20 rounded-xl'>
        <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4'>
          <div className='min-w-0'>
            <p className='font-medium text-foreground'>
              Find your location automatically
            </p>

            <p className='mt-1 text-muted-foreground text-xs leading-5'>
              We&apos;ll detect your current location and fill in the form. You
              can review everything before saving.
            </p>
          </div>

          <Button
            type='button'
            variant='outline'
            disabled={isSaving || isDetectingLocation}
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
                text='Finishing setup'
                shimmer
              />
            ) : (
              <>
                Finish setup
                <Check className='size-4' />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
