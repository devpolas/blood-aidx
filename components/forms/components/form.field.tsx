"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import { FieldError, FieldLabel } from "@/components/ui/field";

export function getFieldId(field: AnyFieldApi, id?: string) {
  return id ?? `form-${String(field.name)}`;
}

export function isFieldInvalid(field: AnyFieldApi) {
  return field.state.meta.isTouched && field.state.meta.errors.length > 0;
}

export function FormFieldError({ field }: { field: AnyFieldApi }) {
  const invalid = isFieldInvalid(field);
  if (!invalid) return null;
  return (
    <FieldError
      errors={field.state.meta.errors.map((error) => ({
        message:
          typeof error === "string" ? error : String(error?.message ?? error),
      }))}
    />
  );
}

export function FormFieldLabel({
  field,
  label,
  id,
}: {
  field: AnyFieldApi;
  label: string;
  id?: string;
}) {
  return (
    <FieldLabel
      htmlFor={getFieldId(field, id)}
      className='font-medium text-foreground'
    >
      {label}
    </FieldLabel>
  );
}
