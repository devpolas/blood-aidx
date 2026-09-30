"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import {
  FormFieldError,
  FormFieldLabel,
  getFieldId,
  isFieldInvalid,
} from "./form.field";

type FormCheckboxProps = {
  field: AnyFieldApi;
  label: string;
  id?: string;
  disabled?: boolean;
  className?: string;
};

export function FormCheckbox({
  field,
  label,
  id,
  disabled = false,
  className,
}: FormCheckboxProps) {
  const checkboxId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);

  return (
    <Field
      data-invalid={invalid}
      orientation='horizontal'
      className='items-center gap-3'
    >
      <Checkbox
        id={checkboxId}
        name={field.name}
        checked={Boolean(field.state.value)}
        onCheckedChange={(checked) => {
          field.handleChange(checked === true);
        }}
        onBlur={field.handleBlur}
        disabled={disabled}
        aria-invalid={invalid}
        className={cn(
          "data-[state=checked]:bg-brand",
          "data-[state=checked]:border-brand",
          className,
        )}
      />

      <FormFieldLabel field={field} label={label} id={checkboxId} />

      <FormFieldError field={field} />
    </Field>
  );
}
