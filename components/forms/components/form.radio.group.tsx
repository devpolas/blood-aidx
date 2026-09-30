"use client";

import type { AnyFieldApi } from "@tanstack/react-form";
import type { LucideIcon } from "lucide-react";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

import { FormFieldError, isFieldInvalid } from "./form.field";

type FormRadioGroupOption = {
  label: string;
  value: string;
  description?: string;
  icon?: LucideIcon;
  disabled?: boolean;
};

type FormRadioGroupProps = {
  field: AnyFieldApi;
  label: string;
  options: FormRadioGroupOption[];
  description?: string;
  disabled?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function FormRadioGroup({
  field,
  label,
  options,
  description,
  disabled = false,
  className,
  orientation = "vertical",
}: FormRadioGroupProps) {
  const invalid = isFieldInvalid(field);

  return (
    <Field data-invalid={invalid} className='space-y-3'>
      <div className='space-y-1'>
        <FieldLabel className='font-medium text-foreground'>{label}</FieldLabel>

        {description && <FieldDescription>{description}</FieldDescription>}
      </div>

      <RadioGroup
        value={field.state.value ?? ""}
        onValueChange={(value) => {
          field.handleChange(value);
          field.handleBlur();
        }}
        disabled={disabled}
        aria-invalid={invalid}
        className={cn(
          orientation === "vertical"
            ? "flex flex-col gap-3"
            : "flex flex-row flex-wrap gap-6",
          className,
        )}
      >
        <FieldGroup
          className={cn(
            orientation === "vertical"
              ? "flex flex-col gap-3"
              : "flex flex-row flex-wrap gap-6",
          )}
        >
          {options.map((option) => {
            const itemId = `form-${String(field.name)}-${option.value}`;
            const Icon = option.icon;
            const isDisabled = disabled || option.disabled;

            return (
              <Field
                key={option.value}
                orientation='horizontal'
                data-invalid={invalid}
                className='items-start gap-3'
              >
                <RadioGroupItem
                  id={itemId}
                  value={option.value}
                  disabled={isDisabled}
                  aria-invalid={invalid}
                  className={cn(
                    "mt-0.5",
                    "data-[state=checked]:border-brand",
                    "data-[state=checked]:text-brand",
                  )}
                />

                <div className='gap-1 grid'>
                  <FieldLabel
                    htmlFor={itemId}
                    className={cn(
                      "font-medium text-foreground",
                      !isDisabled && "cursor-pointer",
                    )}
                  >
                    <span className='flex items-center gap-2'>
                      {Icon && <Icon className='size-4' />}
                      {option.label}
                    </span>
                  </FieldLabel>

                  {option.description && (
                    <FieldDescription>{option.description}</FieldDescription>
                  )}
                </div>
              </Field>
            );
          })}
        </FieldGroup>
      </RadioGroup>

      <FormFieldError field={field} />
    </Field>
  );
}
