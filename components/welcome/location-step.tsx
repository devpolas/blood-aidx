"use client";

import { MapPin } from "lucide-react";
import { LocationForm } from "@/components/forms/location/location.form";
import type { Location } from "@/types/location";
type LocationStepProps = {
  location?: Location;
  disabled?: boolean;
  onComplete: () => void;
};

export function LocationStep({ location, onComplete }: LocationStepProps) {
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

      <LocationForm
        mode={location ? "update" : "create"}
        initialValues={{
          latitude: location?.latitude ?? "",
          longitude: location?.longitude ?? "",
          country: location?.country ?? "",
          division: location?.division ?? "",
          city: location?.city ?? "",
          village: location?.village ?? "",
          postalCode: location?.postalCode ?? "",
          addressLine: location?.addressLine ?? "",
        }}
        onSuccess={onComplete}
      />
    </div>
  );
}
