"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import type { ComponentType, ReactNode } from "react";

import { FormInput } from "@/components/forms/components/form.input";

type LocationAddressFieldsProps = {
  form: {
    Field: ComponentType<{
      name: string;
      children: (field: AnyFieldApi) => ReactNode;
    }>;
  };
  disabled?: boolean;
};

export function LocationAddressFields({
  form,
  disabled = false,
}: LocationAddressFieldsProps) {
  return (
    <div className='gap-4 grid sm:grid-cols-2'>
      <form.Field name='village'>
        {(field) => (
          <FormInput
            field={field}
            label='Village / Neighborhood'
            placeholder='Enter village or neighborhood'
            disabled={disabled}
          />
        )}
      </form.Field>

      <form.Field name='postalCode'>
        {(field) => (
          <FormInput
            field={field}
            label='Postal code'
            placeholder='Enter postal code'
            disabled={disabled}
          />
        )}
      </form.Field>

      <div className='sm:col-span-2'>
        <form.Field name='addressLine'>
          {(field) => (
            <FormInput
              field={field}
              label='Address line'
              placeholder='Street address, house number, or landmark'
              disabled={disabled}
            />
          )}
        </form.Field>
      </div>
    </div>
  );
}
