"use client";

import { useEffect, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import slugify from "slugify";

import {
  Building2,
  BuildingComplexPlus,
  MapPin,
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

import {
  CreateOrganizationSchema,
  type CreateOrganizationInput,
} from "@/validators/organization.validator";
import { LocationForm, LocationFormHandle } from "../location/location.form";

const DEFAULT_VALUES: CreateOrganizationInput = {
  name: "",
  slug: "",
  type: "hospital",
  locationId: undefined,
  description: "",
  phone: "",
  email: "",
  website: "",
};

const ORGANIZATION_TYPE_OPTIONS: FormSelectOption[] = [
  { label: "Hospital", value: "hospital" },
  { label: "Blood Bank", value: "blood_bank" },
  { label: "Clinic", value: "clinic" },
  { label: "NGO", value: "ngo" },
  { label: "Other", value: "other" },
];

export default function CreateOrganizationForm() {
  const locationFormRef = useRef<LocationFormHandle>(null);

  const { mutateAsync: createOrganization, isPending: isCreating } =
    useCreateOrganization();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,
    validators: {
      onSubmit: CreateOrganizationSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      try {
        const savedLocation = await locationFormRef.current?.submit();
        console.log(savedLocation);

        if (!savedLocation?.id) {
          toast.add({
            title: "Location could not be saved",
            description: "Please check the location fields and try again.",
            type: "error",
          });
          return;
        }

        const payload: CreateOrganizationInput = {
          ...value,
          name: value.name.trim(),
          slug: slugify(value.name, {
            lower: true,
            strict: true,
            trim: true,
          }),
          locationId: savedLocation.id,
          description: value.description?.trim() || undefined,
          phone: value.phone?.trim() || undefined,
          email: value.email?.trim() || undefined,
          website: value.website?.trim() || undefined,
        };

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

    return () => subscription.unsubscribe();
  }, [form]);

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
      <div className='flex items-start gap-3'>
        <div className='flex justify-center items-center bg-primary/10 rounded-xl shrink-0'>
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

      {/* Organization Details */}
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
      </section>

      {/* Contact Information */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={Phone}
          title='Contact Information'
          description='Provide contact details people can use to reach your organization.'
        />

        <FieldGroup className='gap-4 lg:gap-5 grid md:grid-cols-3 mt-5'>
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

      {/* Organization Location */}
      <section className='bg-card shadow-sm p-4 sm:p-5 lg:p-6 border rounded-2xl'>
        <SectionHeader
          icon={MapPin}
          title='Organization Location'
          description='Select the country, division, and city, then provide the address.'
        />

        <div className='mt-5'>
          <LocationForm ref={locationFormRef} embedded disabled={isCreating} />
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
          className='w-full sm:w-auto min-w-44 hover:cursor-pointer'
        >
          {isCreating ? (
            <LoadingSpinner text='Creating organization' shimmer />
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
