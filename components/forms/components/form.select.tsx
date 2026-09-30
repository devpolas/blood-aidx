"use client";
import type { AnyFieldApi } from "@tanstack/react-form";
import type { LucideIcon } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Field } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  FormFieldError,
  FormFieldLabel,
  getFieldId,
  isFieldInvalid,
} from "./form.field";
import { namePerfect } from "@/utils/refine.name";

export type FormSelectOption = {
  label: string;
  value: string;
  icon?: LucideIcon;
};

type FormSelectProps = {
  field: AnyFieldApi;
  label: string;
  options: FormSelectOption[];
  id?: string;
  placeholder?: string;
  createNew?: boolean;
  onCreateNew?: () => void;
  disabled?: boolean;
  className?: string;
};

export function FormSelect({
  field,
  label,
  options,
  id,
  placeholder = "Select an option",
  createNew = false,
  onCreateNew,
  disabled = false,
  className,
}: FormSelectProps) {
  const selectId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);
  return (
    <Field data-invalid={invalid} className='space-y-2'>
      <div className='flex justify-between items-center gap-3'>
        <FormFieldLabel field={field} label={label} id={selectId} />
        {createNew && onCreateNew && (
          <Badge
            variant='outline'
            onClick={onCreateNew}
            className={cn(
              "gap-1 cursor-pointer",
              "border-brand/30",
              "text-brand",
              "hover:bg-brand/10",
            )}
          >
            <PlusCircle className='size-4' /> Create New
          </Badge>
        )}
      </div>
      <Select
        value={field.state.value ?? ""}
        onValueChange={(value) => field.handleChange(value)}
        onOpenChange={(open) => {
          if (!open) {
            field.handleBlur();
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger
          id={selectId}
          aria-invalid={invalid}
          className={cn(
            "transition-colors",
            "focus-visible:ring-brand",
            "focus-visible:border-brand",
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.icon && <SelectIcon icon={option.icon} />}
                {namePerfect(option.label)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormFieldError field={field} />
    </Field>
  );
}
function SelectIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className='mr-1 size-4' />;
}
