"use client";

import { useMemo, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Building2, Droplets, MapPin, User } from "lucide-react";
import type { FormSelectOption } from "@/components/forms/components/form.select";
import { LoadingSpinner } from "@/components/shared/loading/loading";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import {
  useCountries,
  useCreateBloodRequest,
  useOrganizations,
  useRegions,
  useSettlements,
} from "@/hooks";
import {
  CreateBloodRequestSchema,
  type BloodRequestFormValues,
  type CreateBloodRequestInput,
} from "@/validators/blood.request.validator";

import { FormInput } from "../components/form.input";
import { FormSelect } from "../components/form.select";
import { FormTextarea } from "../components/form.textarea";
import { FormDatePicker } from "../components/form.date.picker";

const DEFAULT_VALUES: BloodRequestFormValues = {
  organizationId: "",
  bloodGroup: "",
  unitsRequired: undefined,
  priority: "low",
  patientName: "",
  patientAge: undefined,
  requiredAt: "",
  expiresAt: "",
  description: "",
};

const bloodGroupOptions: FormSelectOption[] = [
  { label: "A+", value: "a_positive" },
  { label: "A−", value: "a_negative" },
  { label: "B+", value: "b_positive" },
  { label: "B−", value: "b_negative" },
  { label: "AB+", value: "ab_positive" },
  { label: "AB−", value: "ab_negative" },
  { label: "O+", value: "o_positive" },
  { label: "O−", value: "o_negative" },
];

const priorityOptions: FormSelectOption[] = [
  { label: "Low", value: "low" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

type LocationState = {
  country: string;
  division: string;
  city: string;
};

const EMPTY_LOCATION: LocationState = {
  country: "",
  division: "",
  city: "",
};

export default function RequestBloodForm() {
  const [location, setLocation] = useState<LocationState>(EMPTY_LOCATION);

  const { mutateAsync: createBloodRequest, isPending: isCreating } =
    useCreateBloodRequest();

  const countries = useCountries();
  const regions = useRegions(location.country || undefined);

  const regionId = location.division ? Number(location.division) : undefined;

  const settlements = useSettlements(location.country || undefined, regionId);

  const organizations = useOrganizations({
    page: 1,
    limit: 100,
    country: location.country || undefined,
    division: location.division || undefined,
    city: location.city || undefined,
  });

  const organizationOptions = useMemo<FormSelectOption[]>(
    () =>
      organizations.data?.data?.organizations?.map((organization) => ({
        label: organization.name,
        value: organization.id,
      })) ?? [],
    [organizations.data?.data?.organizations],
  );

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: CreateBloodRequestSchema,
    },
    onSubmit: async ({ value }) => {
      const payload: CreateBloodRequestInput = {
        organizationId: value.organizationId,
        bloodGroup: value.bloodGroup,
        unitsRequired: value.unitsRequired,
        priority: value.priority,
        patientName: value.patientName,
        patientAge: value.patientAge,
        requiredAt: value.requiredAt,
        expiresAt: value.expiresAt,
        description: value.description,
      };

      try {
        const response = await createBloodRequest(payload);

        if (!response.success) {
          toast.add({
            title: "Request failed",
            description:
              response.message ||
              "Unable to create the blood request. Please try again.",
            type: "error",
          });
          return;
        }

        form.reset();
        setLocation(EMPTY_LOCATION);

        toast.add({
          title: "Request created",
          description: "Your blood request has been created successfully.",
          type: "success",
        });
      } catch (error) {
        toast.add({
          title: "Request failed",
          description:
            error instanceof Error
              ? error.message
              : "Unable to create the blood request. Please try again.",
          type: "error",
        });
      }
    },
  });

  const handleCountryChange = (country: string) => {
    setLocation({
      country,
      division: "",
      city: "",
    });

    form.setFieldValue("organizationId", "");
  };

  const handleDivisionChange = (division: string) => {
    setLocation((current) => ({
      ...current,
      division,
      city: "",
    }));

    form.setFieldValue("organizationId", "");
  };

  const handleCityChange = (city: string) => {
    setLocation((current) => ({
      ...current,
      city,
    }));

    form.setFieldValue("organizationId", "");
  };

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
      {/* Request Details */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={Droplets}
          title='Request Details'
          description='Provide the blood requirement details.'
        />

        <FieldGroup className='items-center gap-4 lg:gap-5 grid md:grid-cols-3 mt-5'>
          <form.Field name='bloodGroup'>
            {(field) => (
              <FormSelect
                field={field}
                id='blood-group'
                label='Blood Group'
                options={bloodGroupOptions}
                placeholder='Select blood group'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='unitsRequired'>
            {(field) => (
              <FormInput
                field={field}
                id='units'
                label='Units'
                type='number'
                placeholder='Enter units'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='priority'>
            {(field) => (
              <FormSelect
                field={field}
                id='priority'
                label='Priority'
                options={priorityOptions}
                placeholder='Select priority'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>
        </FieldGroup>
      </section>

      {/* Location */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={MapPin}
          title='Location'
          description='Choose the area where the blood is needed.'
        />

        <FieldGroup className='gap-4 lg:gap-5 grid md:grid-cols-3 mt-5'>
          <LocationSelect
            label='Country'
            value={location.country}
            options={countries.options}
            placeholder='Select country'
            disabled={isCreating || countries.isLoading}
            onChange={handleCountryChange}
          />

          <LocationSelect
            label='Division'
            value={location.division}
            options={regions.options}
            placeholder={
              location.country ? "Select division" : "Select country first"
            }
            disabled={isCreating || !location.country || regions.isLoading}
            onChange={handleDivisionChange}
          />

          <LocationSelect
            label='City'
            value={location.city}
            options={settlements.options}
            placeholder={
              location.division ? "Select city" : "Select division first"
            }
            disabled={isCreating || !location.division || settlements.isLoading}
            onChange={handleCityChange}
          />
        </FieldGroup>

        {/* Organization */}
        <div className='bg-muted/20 mt-5 p-4 sm:p-5 border rounded-xl'>
          <div className='flex items-start gap-3'>
            <div className='flex justify-center items-center bg-primary/10 rounded-lg size-9 shrink-0'>
              <Building2 className='size-4 text-primary' />
            </div>

            <div className='min-w-0'>
              <h3 className='font-medium'>Organization</h3>
              <p className='mt-0.5 text-muted-foreground text-sm leading-5'>
                Select the hospital or blood bank responsible for fulfilling
                this request.
              </p>
            </div>
          </div>

          <div className='mt-4'>
            <form.Field name='organizationId'>
              {(field) => (
                <FormSelect
                  field={field}
                  id='organization'
                  label='Organization'
                  options={organizationOptions}
                  placeholder={
                    !location.city
                      ? "Select location first"
                      : organizations.isLoading
                        ? "Loading organizations..."
                        : organizationOptions.length === 0
                          ? "No organizations found"
                          : "Select organization"
                  }
                  isRequired
                  disabled={
                    isCreating ||
                    !location.city ||
                    organizations.isLoading ||
                    organizationOptions.length === 0
                  }
                />
              )}
            </form.Field>
          </div>
        </div>
      </section>

      {/* Patient Information */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={User}
          title='Patient Information'
          description='Provide patient and timing information.'
        />

        <FieldGroup className='gap-4 lg:gap-5 grid sm:grid-cols-2 mt-5'>
          <form.Field name='patientName'>
            {(field) => (
              <FormInput
                field={field}
                id='patient-name'
                type='text'
                label='Patient Name'
                placeholder='Enter patient name'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='patientAge'>
            {(field) => (
              <FormInput
                field={field}
                id='patient-age'
                label='Patient Age'
                type='number'
                placeholder='Enter patient age'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='requiredAt'>
            {(field) => (
              <FormDatePicker
                field={field}
                id='required-at'
                label='Required At'
                placeholder='Pick a date'
                isRequired
                disabled={isCreating}
              />
            )}
          </form.Field>

          <form.Field name='expiresAt'>
            {(field) => (
              <FormDatePicker
                field={field}
                id='expires-at'
                label='Expires At'
                placeholder='Pick a date'
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
                id='description'
                label='Description'
                placeholder='Add any additional information about the blood requirement...'
                disabled={isCreating}
              />
            )}
          </form.Field>
        </div>
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
          className='w-full sm:w-auto min-w-40 hover:cursor-pointer glass-brand'
        >
          {isCreating ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Creating request'
              shimmer
            />
          ) : (
            <>
              <Droplets className='size-4' />
              Create Request
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function LocationSelect({
  label,
  value,
  options,
  placeholder,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  options: FormSelectOption[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <FormSelect
      field={
        {
          state: {
            value,
            meta: {
              errors: [],
              isTouched: false,
              isDirty: false,
              isValidating: false,
              isValid: true,
            },
          },
          handleChange: onChange,
          handleBlur: () => undefined,
        } as never
      }
      label={label}
      options={options}
      placeholder={placeholder}
      isRequired
      disabled={disabled}
    />
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Droplets;
  title: string;
  description: string;
}) {
  return (
    <div className='flex items-start gap-3'>
      <div className='flex justify-center items-center bg-primary/10 rounded-xl size-10 shrink-0'>
        <Icon className='size-5 text-primary' />
      </div>

      <div className='min-w-0'>
        <h2 className='font-semibold leading-6'>{title}</h2>
        <p className='mt-0.5 text-muted-foreground text-sm leading-5'>
          {description}
        </p>
      </div>
    </div>
  );
}
