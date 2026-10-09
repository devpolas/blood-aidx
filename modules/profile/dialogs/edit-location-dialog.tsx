"use client";

import { MapPin } from "lucide-react";
import type { Location } from "@/types/location";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LocationForm } from "@/components/forms/location/location.form";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg max-h-[90dvh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <MapPin className='size-5 text-brand' />
            Edit Location
          </DialogTitle>

          <DialogDescription>
            Update your registered location and address. You can detect your
            current location or select your location from the available options.
          </DialogDescription>
        </DialogHeader>

        {open && (
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
            onSuccess={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
