"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  FormFieldError,
  FormFieldLabel,
  getFieldId,
  isFieldInvalid,
} from "./form.field";

type FormFileProps = {
  field: AnyFieldApi;
  label: string;
  id?: string;
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  className?: string;
  helperText?: string;
};

export function FormFile({
  field,
  label,
  id,
  disabled = false,
  multiple = false,
  accept,
  className,
  helperText,
}: FormFileProps) {
  const inputId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);

  return (
    <Field data-invalid={invalid} className='space-y-2'>
      <FormFieldLabel field={field} label={label} id={inputId} />

      <Input
        id={inputId}
        name={field.name}
        type='file'
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        aria-invalid={invalid}
        onBlur={field.handleBlur}
        onChange={(event) => {
          const files = event.target.files;

          field.handleChange(multiple ? files : files?.[0]);
        }}
        className={cn(
          "cursor-pointer",
          "transition-colors",
          "focus-visible:ring-brand",
          "focus-visible:border-brand",
          className,
        )}
      />

      {helperText && (
        <p className='text-muted-foreground text-xs'>{helperText}</p>
      )}

      <FormFieldError field={field} />
    </Field>
  );
}
