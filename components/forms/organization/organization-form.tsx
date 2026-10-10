"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import slugify from "slugify";

import {
  Building2,
  BuildingComplexPlus,
  Check,
  LocateFixed,
  MapPin,
  MapPinned,
  Phone,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import type { FormSelectOption } from "@/components/forms/components/form.select";
import { FormInput } from "@/components/forms/components/form.input";
import { FormSelect } from "@/components/forms/components/form.select";
import { FormTextarea } from "@/components/forms/components/form.textarea";
import { Heading4, Heading5, Muted } from "@/components/typography/typography";
import { useCreateOrganization } from "@/hooks";

import type { PropertyLocationPayload } from "@/hooks/locations/use.geo.location";
import type { WorldLocationNames } from "@/hooks/locations/use.location.fields";

import {
  CreateOrganizationSchema,
  type CreateOrganizationInput,
} from "@/validators/organization.validator";
import { LocationFields } from "../location/location.fields";
import { LocationDetect } from "../location/location.detect";

type LocationMode = "manual" | "geolocation";

const DEFAULT_VALUES: CreateOrganizationInput = {
  name: "",
  slug: "",
  type: "hospital",
  location: {
    country: "",
    division: "",
    city: "",
    village: "",
    postalCode: "",
    addressLine: "",
    latitude: undefined,
    longitude: undefined,
  },
  description: "",
  phone: "",
  email: "",
  website: "",
  registrationNo: "",
};

const ORGANIZATION_TYPE_OPTIONS: FormSelectOption[] = [
  { label: "Hospital", value: "hospital" },
  { label: "Blood Bank", value: "blood_bank" },
  { label: "Clinic", value: "clinic" },
  { label: "NGO", value: "ngo" },
  { label: "Other", value: "other" },
];

const LOCATION_MODES = [
  {
    value: "manual",
    label: "Choose manually",
    description: "Select country, division, and city from PlaceDB.",
    icon: MapPin,
  },
  {
    value: "geolocation",
    label: "Detect location",
    description: "Use your device's current location.",
    icon: LocateFixed,
  },
] as const;

export default function CreateOrganizationForm() {
  const { mutateAsync: createOrganization, isPending: isCreating } =
    useCreateOrganization();

  const [locationMode, setLocationMode] = useState<LocationMode>("manual");

  const [detectedLocation, setDetectedLocation] =
    useState<PropertyLocationPayload | null>(null);

  const [manualInitialNames, setManualInitialNames] =
    useState<WorldLocationNames>({
      country: "",
      division: "",
      city: "",
    });

  const locationModeRef = useRef<LocationMode>("manual");

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: CreateOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      const payload: CreateOrganizationInput = {
        ...value,
        name: value.name.trim(),
        slug: slugify(value.name, {
          lower: true,
          strict: true,
          trim: true,
        }),
        location: {
          ...value.location,
          country: value.location.country.trim(),
          division: value.location.division.trim(),
          city: value.location.city.trim(),
          village: value.location.village.trim(),
          postalCode: value.location.postalCode.trim(),
          addressLine: value.location.addressLine?.trim() || undefined,
          latitude: value.location.latitude?.trim() || undefined,
          longitude: value.location.longitude?.trim() || undefined,
        },
        description: value.description?.trim() || undefined,
        phone: value.phone?.trim() || undefined,
        email: value.email?.trim() || undefined,
        website: value.website?.trim() || undefined,
        registrationNo: value.registrationNo?.trim() || undefined,
      };

      try {
        const response = await createOrganization(payload);

        if (!response.success) {
          toast.add({
            title: "Organization creation failed",
            description:
              response.message ||
              "Unable to create the organization. Please try again.",
            type: "error",
          });
          return;
        }

        form.reset();

        setLocationMode("manual");
        locationModeRef.current = "manual";
        setDetectedLocation(null);
        setManualInitialNames({
          country: "",
          division: "",
          city: "",
        });

        toast.add({
          title: "Organization created",
          description: "Your organization has been created successfully.",
          type: "success",
        });
      } catch (error) {
        toast.add({
          title: "Organization creation failed",
          description:
            error instanceof Error
              ? error.message
              : "Unable to create the organization. Please try again.",
          type: "error",
        });
      }
    },
  });

  // Keep the hidden slug synchronized with the organization name.
  useEffect(() => {
    const subscription = form.store.subscribe(() => {
      const name = form.getFieldValue("name");
      const slug = slugify(name, {
        lower: true,
        strict: true,
        trim: true,
      });

      if (form.getFieldValue("slug") !== slug) {
        form.setFieldValue("slug", slug);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [form]);

  // Sync the resolved PlaceDB names with the nested organization location.
  const handleWorldNamesChange = useCallback(
    (names: WorldLocationNames | null) => {
      const nextNames: WorldLocationNames = {
        country: names?.country ?? "",
        division: names?.division ?? "",
        city: names?.city ?? "",
      };

      setManualInitialNames((current) =>
        current.country === nextNames.country &&
        current.division === nextNames.division &&
        current.city === nextNames.city
          ? current
          : nextNames,
      );

      if (form.getFieldValue("location.country") !== nextNames.country) {
        form.setFieldValue("location.country", nextNames.country);
      }

      if (form.getFieldValue("location.division") !== nextNames.division) {
        form.setFieldValue("location.division", nextNames.division);
      }

      if (form.getFieldValue("location.city") !== nextNames.city) {
        form.setFieldValue("location.city", nextNames.city);
      }
    },
    [form],
  );

  // Apply the detected address to the organization form, not a separate location API.
  const handleDetect = useCallback(
    (payload: PropertyLocationPayload) => {
      if (locationModeRef.current !== "geolocation") {
        return;
      }

      setDetectedLocation(payload);

      form.setFieldValue("location.latitude", payload.latitude);
      form.setFieldValue("location.longitude", payload.longitude);
      form.setFieldValue("location.country", payload.country);
      form.setFieldValue("location.division", payload.division);
      form.setFieldValue("location.city", payload.city);
      form.setFieldValue("location.village", payload.village);
      form.setFieldValue("location.postalCode", payload.postalCode);
      form.setFieldValue("location.addressLine", payload.addressLine ?? "");
    },
    [form],
  );

  const handleLocationModeChange = useCallback(
    (nextMode: LocationMode) => {
      if (nextMode === locationModeRef.current || isCreating) {
        return;
      }

      locationModeRef.current = nextMode;
      setLocationMode(nextMode);
      setDetectedLocation(null);

      if (nextMode === "manual") {
        setManualInitialNames({
          country: "",
          division: "",
          city: "",
        });

        form.setFieldValue("location.latitude", undefined);
        form.setFieldValue("location.longitude", undefined);
        form.setFieldValue("location.country", "");
        form.setFieldValue("location.division", "");
        form.setFieldValue("location.city", "");
        form.setFieldValue("location.village", "");
        form.setFieldValue("location.postalCode", "");
        form.setFieldValue("location.addressLine", "");
      }
    },
    [form, isCreating],
  );

  return (
    <form
      aria-busy={isCreating}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className='space-y-5 sm:space-y-6 w-full'
    >
      {/* Header */}
      <div className='flex items-start gap-3'>
        <div className='flex justify-center items-center bg-primary/10 p-1 rounded-xl shrink-0'>
          <BuildingComplexPlus className='size-8 text-primary' />
        </div>

        <div className='min-w-0'>
          <Heading4 className='leading-6'>Register Your Organization</Heading4>
          <Muted className='mt-0.5'>
            Register your hospital, blood bank, or organization by providing its
            name, location, contact information, and other essential details.
          </Muted>
        </div>
      </div>

      {/* Hidden slug */}
      <form.Field name='slug'>
        {(field) => (
          <input
            type='hidden'
            name={field.name}
            value={field.state.value}
            readOnly
          />
        )}
      </form.Field>

      {/* Organization details */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={Building2}
          title='Organization Details'
          description='Enter the name and basic information about your organization.'
        />

        <FieldGroup className='gap-4 lg:gap-5 grid md:grid-cols-2 mt-5'>
          <form.Field name='name'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-name'
                label='Organization Name'
                placeholder='Enter organization name'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='type'>
            {(field) => (
              <FormSelect
                field={field}
                id='organization-type'
                label='Organization Type'
                options={ORGANIZATION_TYPE_OPTIONS}
                placeholder='Select organization type'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>
        </FieldGroup>

        <div className='mt-4 sm:mt-5'>
          <form.Field name='description'>
            {(field) => (
              <FormTextarea
                field={field}
                id='organization-description'
                label='Description'
                placeholder="Describe your organization's services and mission..."
                disabled={isCreating}
              />
            )}
          </form.Field>
        </div>

        <div className='mt-4 sm:mt-5'>
          <form.Field name='registrationNo'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-registration-no'
                label='Registration Number'
                placeholder='Enter registration number'
                disabled={isCreating}
              />
            )}
          </form.Field>
        </div>
      </section>

      {/* Contact information */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={Phone}
          title='Contact Information'
          description='Provide contact details people can use to reach your organization.'
        />

        <FieldGroup className='gap-4 lg:gap-5 grid md:grid-cols-2 lg:grid-cols-3 mt-5'>
          <form.Field name='phone'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-phone'
                label='Phone Number'
                type='tel'
                placeholder='Enter phone number'
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='email'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-email'
                label='Email Address'
                type='email'
                placeholder='organization@example.com'
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='website'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-website'
                label='Website'
                type='url'
                placeholder='https://example.com'
                disabled={isCreating}
              />
            )}
          </form.Field>
        </FieldGroup>
      </section>

      {/* Organization location */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={MapPin}
          title='Organization Location'
          description='Choose the location from PlaceDB or detect it automatically, then provide the complete address.'
        />

        {/* Location method */}
        <div
          className='gap-3 grid grid-cols-1 sm:grid-cols-2 mt-5'
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
                disabled={isCreating}
                aria-pressed={selected}
                onClick={() => handleLocationModeChange(item.value)}
                className={[
                  "group flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:pointer-events-none disabled:opacity-60",
                  selected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-background hover:border-primary/50 hover:bg-muted/40",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex size-10 shrink-0 items-center justify-center rounded-lg",
                    selected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
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

        {locationMode === "manual" ? (
          <div className='space-y-4 mt-5'>
            <div className='space-y-1'>
              <Heading5>Select location</Heading5>
              <Muted>
                Choose a country, division, and city. Changing a parent
                selection clears its dependent selections automatically.
              </Muted>
            </div>

            <LocationFields
              initialNames={manualInitialNames}
              disabled={isCreating}
              onNamesChange={handleWorldNamesChange}
            />
          </div>
        ) : (
          <div className='space-y-3 mt-5'>
            <LocationDetect
              disabled={isCreating}
              autoDetect={locationMode === "geolocation"}
              onDetect={handleDetect}
            />

            {detectedLocation && (
              <div className='bg-card border rounded-xl overflow-hidden'>
                <div className='flex items-center gap-2 bg-muted/30 px-4 py-3 border-b'>
                  <Check className='size-4 text-primary' />
                  <span className='font-medium text-sm'>Detected address</span>
                </div>

                <div className='gap-px grid grid-cols-1 sm:grid-cols-3 bg-border'>
                  {[
                    {
                      label: "Country",
                      value: detectedLocation.country,
                    },
                    {
                      label: "Division",
                      value: detectedLocation.division,
                    },
                    {
                      label: "City",
                      value: detectedLocation.city,
                    },
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

                {detectedLocation.latitude && detectedLocation.longitude && (
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
            )}
          </div>
        )}

        {/* Address information */}
        <div className='flex items-start gap-3 mt-6'>
          <div className='flex justify-center items-center bg-primary/10 rounded-lg size-9 shrink-0'>
            <MapPinned className='size-4 text-primary' />
          </div>

          <div className='min-w-0'>
            <Heading5 className='leading-6'>Address Information</Heading5>
            <Muted className='mt-0.5'>
              Add the organization&apos;s village, postal code, and street
              address.
            </Muted>
          </div>
        </div>

        <FieldGroup className='gap-4 lg:gap-5 grid sm:grid-cols-2 mt-4'>
          <form.Field name='location.village'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-village'
                label='Village / Area'
                placeholder='Enter village or area'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='location.postalCode'>
            {(field) => (
              <FormInput
                field={field}
                id='organization-postal-code'
                label='Postal Code'
                placeholder='Enter postal code'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <div className='sm:col-span-2'>
            <form.Field name='location.addressLine'>
              {(field) => (
                <FormInput
                  field={field}
                  id='organization-address'
                  label='Address Line'
                  placeholder='Street, building, or additional address details'
                  disabled={isCreating}
                />
              )}
            </form.Field>
          </div>
        </FieldGroup>
      </section>

      {/* Actions */}
      <div className='flex sm:flex-row flex-col-reverse sm:justify-end sm:items-center gap-3 pt-5 border-t'>
        <Button
          type='button'
          variant='outline'
          disabled={isCreating}
          onClick={() => window.history.back()}
          className='w-full sm:w-auto'
        >
          Cancel
        </Button>

        <Button
          type='submit'
          disabled={isCreating}
          className='w-full sm:w-auto min-w-44 hover:cursor-pointer'
        >
          {isCreating ? (
            <LoadingSpinner
              text='Creating organization'
              spinnerClassName='text-brand'
              textClassName='text-brand'
              shimmer
            />
          ) : (
            <>
              <Save className='size-4' />
              Create Organization
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Building2;
  title: string;
  description: string;
}) {
  return (
    <div className='flex items-start gap-3'>
      <div className='flex justify-center items-center bg-primary/10 rounded-xl size-10 shrink-0'>
        <Icon className='size-5 text-primary' />
      </div>

      <div className='min-w-0'>
        <Heading5 className='leading-6'>{title}</Heading5>
        <Muted className='mt-0.5'>{description}</Muted>
      </div>
    </div>
  );
}
