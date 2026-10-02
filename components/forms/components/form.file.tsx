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
  isRequired?: boolean;
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
  isRequired,
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
      <div className='flex items-center gap-0.5'>
        <FormFieldLabel field={field} label={label} id={inputId} />
        {isRequired && (
          <span className='text-destructive' aria-hidden='true'>
            *
          </span>
        )}
      </div>

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
