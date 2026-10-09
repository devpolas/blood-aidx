"use client";

import { useEffect, useRef } from "react";
import { Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/locations/use.geo.location";
import type { PropertyLocationPayload } from "@/hooks/locations/use.geo.location";

type LocationDetectProps = {
  disabled?: boolean;
  autoDetect?: boolean;
  onStart?: () => void;
  onDetect: (payload: PropertyLocationPayload) => void;
};

export function LocationDetect({
  disabled = false,
  autoDetect = false,
  onStart,
  onDetect,
}: LocationDetectProps) {
  const { getPosition, locationPayload, isLoading, error } = useGeoLocation();

  const hasAutoDetected = useRef(false);
  const lastHandledPayload = useRef<PropertyLocationPayload | null>(null);

  const startDetection = () => {
    onStart?.();
    getPosition();
  };

  useEffect(() => {
    if (!autoDetect) {
      hasAutoDetected.current = false;
      lastHandledPayload.current = null;
      return;
    }

    if (disabled || isLoading || hasAutoDetected.current) return;

    hasAutoDetected.current = true;
    startDetection();
  }, [autoDetect, disabled, isLoading]);

  useEffect(() => {
    if (
      !autoDetect ||
      !locationPayload ||
      lastHandledPayload.current === locationPayload
    ) {
      return;
    }

    lastHandledPayload.current = locationPayload;
    onDetect(locationPayload);
  }, [autoDetect, locationPayload, onDetect]);

  return (
    <div className='space-y-2'>
      <Button
        type='button'
        variant='outline'
        onClick={startDetection}
        disabled={disabled || isLoading}
        className='cursor-pointer'
      >
        {isLoading ? (
          <span>Detecting location...</span>
        ) : (
          <span className='flex flex-row items-center gap-1'>
            <Locate className='size-4 text-brand' />
            <span>Detect location</span>
          </span>
        )}
      </Button>

      {error && (
        <p role='alert' className='text-destructive text-sm'>
          {error}
        </p>
      )}

      {locationPayload && !error && (
        <p className='text-muted-foreground text-sm'>
          Location detected. Review the suggested address below.
        </p>
      )}
    </div>
  );
}
