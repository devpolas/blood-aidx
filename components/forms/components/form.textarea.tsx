"use client";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  FormFieldError,
  FormFieldLabel,
  getFieldId,
  isFieldInvalid,
} from "./form.field";

type FormTextareaProps = {
  field: AnyFieldApi;
  label: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  height?: number;
  className?: string;
};
export function FormTextarea({
  field,
  label,
  id,
  placeholder,
  disabled = false,
  height = 120,
  className,
}: FormTextareaProps) {
  const textareaId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);
  return (
    <Field data-invalid={invalid} className='space-y-2'>
      <FormFieldLabel field={field} label={label} id={textareaId} />
      <Textarea
        id={textareaId}
        name={field.name}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        style={{ height: `${height}px` }}
        className={cn(
          "transition-colors resize-y",
          "focus-visible:ring-brand",
          "focus-visible:border-brand",
          className,
        )}
      />
      <FormFieldError field={field} />
    </Field>
  );
}
