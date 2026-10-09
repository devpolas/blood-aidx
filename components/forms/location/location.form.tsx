"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { useForm } from "@tanstack/react-form";

import {
  Check,
  ChevronRight,
  LocateFixed,
  MapPin,
  MapPinned,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCreateLocation, useUpdateMyLocation } from "@/hooks";

import type { PropertyLocationPayload } from "@/hooks/locations/use.geo.location";
import type { Location as LocationRecord } from "@/types/location";
import type { LocationFormValues } from "@/validators/location.validator";

import { LocationCreateSchema } from "@/validators/location.validator";

import { LocationAddressFields } from "./location.address.fields";
import { LocationDetect } from "./location.detect";
import { LocationFields } from "./location.fields";

export type LocationFormHandle = {
  submit: () => Promise<LocationRecord | null>;
};

type LocationFormProps = {
  mode?: "create" | "update";
  initialValues?: LocationFormValues;
  embedded?: boolean;
  disabled?: boolean;
  onSuccess?: (location: LocationRecord) => void;
};

type LocationMode = "manual" | "geolocation";

type LocationNames = {
  country: string;
  division: string;
  city: string;
};

const DEFAULT_VALUES: LocationFormValues = {
  latitude: "",
  longitude: "",
  country: "",
  division: "",
  city: "",
  village: "",
  postalCode: "",
  addressLine: "",
};

const LOCATION_MODES = [
  {
    value: "manual",
    label: "Choose manually",
    description: "Select from PlaceDB",
    icon: MapPin,
  },
  {
    value: "geolocation",
    label: "Detect location",
    description: "Use your current location",
    icon: LocateFixed,
  },
] as const;

export const LocationForm = forwardRef<LocationFormHandle, LocationFormProps>(
  function LocationForm(
    {
      mode = "create",
      initialValues,
      embedded = false,
      disabled = false,
      onSuccess,
    },
    ref,
  ) {
    const createLocation = useCreateLocation();
    const updateLocation = useUpdateMyLocation();

    const values = initialValues ?? DEFAULT_VALUES;

    const [locationMode, setLocationMode] = useState<LocationMode>("manual");

    const [detectedLocation, setDetectedLocation] =
      useState<PropertyLocationPayload | null>(null);

    const [manualInitialNames, setManualInitialNames] = useState<LocationNames>(
      () => ({
        country: values.country,
        division: values.division,
        city: values.city,
      }),
    );

    const locationModeRef = useRef<LocationMode>("manual");
    const savedLocationRef = useRef<LocationRecord | null>(null);

    const previousValues = useRef(JSON.stringify(values));

    const isPending =
      disabled || createLocation.isPending || updateLocation.isPending;

    const form = useForm({
      defaultValues: { ...values },
      validators: {
        onSubmit: LocationCreateSchema,
      },
      onSubmit: async ({ value }) => {
        console.log(value);
        const payload: LocationFormValues = {
          latitude: value.latitude?.trim() || "",
          longitude: value.longitude?.trim() || "",
          country: value.country.trim(),
          division: value.division.trim(),
          city: value.city.trim(),
          village: value.village.trim(),
          postalCode: value.postalCode.trim(),
          addressLine: value.addressLine?.trim() || "",
        };

        const response =
          mode === "update"
            ? await updateLocation.mutateAsync(payload)
            : await createLocation.mutateAsync(payload);

        if (!response.success || !response.data?.location) {
          return;
        }

        const location = response.data.location as LocationRecord;

        savedLocationRef.current = location;
        onSuccess?.(location);
      },
    });

    // Sync the form only when incoming initial values actually change.
    useEffect(() => {
      const nextValues: LocationFormValues = {
        latitude: values.latitude,
        longitude: values.longitude,
        country: values.country,
        division: values.division,
        city: values.city,
        village: values.village,
        postalCode: values.postalCode,
        addressLine: values.addressLine,
      };

      const nextValuesKey = JSON.stringify(nextValues);

      if (previousValues.current === nextValuesKey) {
        return;
      }

      previousValues.current = nextValuesKey;

      form.reset(nextValues);

      const nextNames: LocationNames = {
        country: nextValues.country,
        division: nextValues.division,
        city: nextValues.city,
      };

      setManualInitialNames(nextNames);
      locationModeRef.current = "manual";
      setLocationMode("manual");
      setDetectedLocation(null);
    }, [
      values.latitude,
      values.longitude,
      values.country,
      values.division,
      values.city,
      values.village,
      values.postalCode,
      values.addressLine,
      form,
    ]);

    const submit = useCallback(async (): Promise<LocationRecord | null> => {
      savedLocationRef.current = null;

      try {
        await form.handleSubmit();
        return savedLocationRef.current;
      } catch {
        // Mutation hooks should handle API errors.
        return null;
      }
    }, [form]);

    useImperativeHandle(ref, () => ({ submit }), [submit]);

    const handleWorldNamesChange = useCallback(
      (names: LocationNames | null) => {
        const nextNames: LocationNames = {
          country: names?.country ?? "",
          division: names?.division ?? "",
          city: names?.city ?? "",
        };

        setManualInitialNames((current) => {
          if (
            current.country === nextNames.country &&
            current.division === nextNames.division &&
            current.city === nextNames.city
          ) {
            return current;
          }

          return nextNames;
        });

        if (form.getFieldValue("country") !== nextNames.country) {
          form.setFieldValue("country", nextNames.country);
        }

        if (form.getFieldValue("division") !== nextNames.division) {
          form.setFieldValue("division", nextNames.division);
        }

        if (form.getFieldValue("city") !== nextNames.city) {
          form.setFieldValue("city", nextNames.city);
        }
      },
      [form],
    );

    const handleDetect = useCallback(
      (payload: PropertyLocationPayload) => {
        // Ignore results from a detection that completed after mode changed.
        if (locationModeRef.current !== "geolocation") {
          return;
        }

        setDetectedLocation(payload);

        form.setFieldValue("latitude", payload.latitude);
        form.setFieldValue("longitude", payload.longitude);
        form.setFieldValue("country", payload.country);
        form.setFieldValue("division", payload.division);
        form.setFieldValue("city", payload.city);
        form.setFieldValue("village", payload.village);
        form.setFieldValue("postalCode", payload.postalCode);
        form.setFieldValue("addressLine", payload.addressLine ?? "");
      },
      [form],
    );

    const handleManualMode = useCallback(() => {
      locationModeRef.current = "manual";

      setLocationMode("manual");
      setDetectedLocation(null);

      // Start with fresh PlaceDB selections.
      setManualInitialNames({
        country: "",
        division: "",
        city: "",
      });

      form.setFieldValue("latitude", "");
      form.setFieldValue("longitude", "");
      form.setFieldValue("country", "");
      form.setFieldValue("division", "");
      form.setFieldValue("city", "");
    }, [form]);

    const handleLocationModeChange = useCallback(
      (nextMode: LocationMode) => {
        if (nextMode === locationModeRef.current || isPending) {
          return;
        }

        if (nextMode === "manual") {
          handleManualMode();
          return;
        }

        locationModeRef.current = "geolocation";
        setDetectedLocation(null);
        setLocationMode("geolocation");
      },
      [handleManualMode, isPending],
    );

    const fields = (
      <div className='space-y-6'>
        {/* Location method */}
        <section className='space-y-3'>
          <div className='space-y-1'>
            <h3 className='font-semibold text-sm'>Location method</h3>
            <p className='text-muted-foreground text-sm'>
              Choose how you want to provide your location.
            </p>
          </div>

          <div
            className='gap-3 grid grid-cols-1 sm:grid-cols-2'
            role='group'
            aria-label='Location method'
          >
            {LOCATION_MODES.map((item) => {
              const Icon = item.icon;
              const selected = locationMode === item.value;

              return (
                <button
                  key={item.value}
                  type='button'
                  disabled={isPending}
                  aria-pressed={selected}
                  onClick={() => handleLocationModeChange(item.value)}
                  className={[
                    "group relative flex min-w-0 items-start gap-3",
                    "rounded-xl border p-4 text-left",
                    "transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-60",
                    "cursor-pointer",
                    selected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-background hover:border-primary/50 hover:bg-muted/40",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      "transition-colors",
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:text-foreground",
                    ].join(" ")}
                  >
                    <Icon className='size-5' />
                  </span>

                  <span className='flex-1 space-y-1 min-w-0'>
                    <span className='block font-semibold text-sm'>
                      {item.label}
                    </span>
                    <span className='block text-muted-foreground text-xs leading-5'>
                      {item.description}
                    </span>
                  </span>

                  <span
                    className={[
                      "flex size-5 shrink-0 items-center justify-center rounded-full border",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-transparent",
                    ].join(" ")}
                  >
                    {selected && <Check className='size-3.5' />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected location method */}
        {locationMode === "manual" ? (
          <section className='space-y-4'>
            <div className='flex items-start gap-3'>
              <span className='flex justify-center items-center bg-primary/10 rounded-lg size-9 text-primary shrink-0'>
                <MapPin className='size-4' />
              </span>

              <div className='space-y-1 min-w-0'>
                <h3 className='font-semibold text-sm'>Select your area</h3>
                <p className='text-muted-foreground text-sm leading-5'>
                  Choose your country, division, and city from the available
                  lists.
                </p>
              </div>
            </div>

            <LocationFields
              initialNames={manualInitialNames}
              disabled={isPending}
              onNamesChange={handleWorldNamesChange}
            />
          </section>
        ) : (
          <section className='space-y-4'>
            <LocationDetect
              disabled={isPending}
              autoDetect={locationMode === "geolocation"}
              onDetect={handleDetect}
            />

            <div className='bg-card border rounded-xl overflow-hidden'>
              <div className='flex items-center gap-2 bg-muted/30 px-4 py-3 border-b'>
                <Check className='size-4 text-primary' />
                <span className='font-medium text-sm'>Detected address</span>
              </div>

              <div className='gap-px grid grid-cols-1 sm:grid-cols-3 bg-border'>
                {[
                  { label: "Country", value: detectedLocation?.country },
                  { label: "Division", value: detectedLocation?.division },
                  { label: "City", value: detectedLocation?.city },
                ].map((item) => (
                  <div key={item.label} className='bg-card px-4 py-3 min-w-0'>
                    <p className='mb-1 text-muted-foreground text-xs'>
                      {item.label}
                    </p>
                    <p className='font-medium text-sm wrap-break-words'>
                      {item.value || "Not available"}
                    </p>
                  </div>
                ))}
              </div>

              {detectedLocation?.latitude && detectedLocation.longitude && (
                <div className='px-4 py-3 border-t'>
                  <p className='mb-1 text-muted-foreground text-xs'>
                    Coordinates
                  </p>
                  <p className='font-mono text-muted-foreground text-xs break-all'>
                    {detectedLocation.latitude}, {detectedLocation.longitude}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Editable address fields */}
        <section className='space-y-4'>
          <div className='flex items-start gap-3'>
            <span className='flex justify-center items-center bg-primary/10 rounded-lg size-9 text-primary shrink-0'>
              <MapPinned className='size-4' />
            </span>

            <div className='space-y-1 min-w-0'>
              <h3 className='font-semibold text-sm'>Address information</h3>
              <p className='text-muted-foreground text-sm leading-5'>
                Add or correct your local address details.
              </p>
            </div>
          </div>

          <LocationAddressFields form={form} disabled={isPending} />
        </section>

        {!embedded && (
          <div className='flex sm:flex-row flex-col-reverse sm:justify-end gap-3 pt-5 border-t'>
            <Button
              type='submit'
              disabled={isPending}
              className='w-full sm:w-auto'
            >
              {isPending
                ? "Saving location..."
                : mode === "update"
                  ? "Update location"
                  : "Save location"}

              {!isPending && <ChevronRight className='size-4' />}
            </Button>
          </div>
        )}
      </div>
    );

    if (embedded) {
      return fields;
    }

    return (
      <form
        className='min-w-0'
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void submit();
        }}
      >
        {fields}
      </form>
    );
  },
);
