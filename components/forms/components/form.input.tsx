"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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

type FormInputProps = {
  field: AnyFieldApi;
  label: string;
  id?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
};

export function FormInput({
  field,
  label,
  id,
  placeholder,
  type = "text",
  disabled = false,
  autoComplete,
  className,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const inputId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);
  return (
    <Field data-invalid={invalid} className='space-y-2'>
      <FormFieldLabel field={field} label={label} id={inputId} />
      <div className='relative'>
        <Input
          id={inputId}
          name={field.name}
          type={inputType}
          value={field.state.value ?? ""}
          onBlur={field.handleBlur}
          onChange={(event) => {
            const value = event.target.value;
            if (type === "number") {
              field.handleChange(value === "" ? undefined : Number(value));
              return;
            }
            field.handleChange(value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete ?? field.name}
          aria-invalid={invalid}
          className={cn(
            "transition-colors",
            "focus-visible:ring-brand",
            "focus-visible:border-brand",
            isPassword && "pr-10",
            className,
          )}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword((previous) => !previous)}
            disabled={disabled}
            className={cn(
              "top-1/2 right-3 absolute",
              "-translate-y-1/2",
              "text-muted-foreground",
              "transition-colors",
              "hover:text-brand",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className='size-5' />
            ) : (
              <Eye className='size-5' />
            )}
          </button>
        )}
      </div>
      <FormFieldError field={field} />
    </Field>
  );
}
