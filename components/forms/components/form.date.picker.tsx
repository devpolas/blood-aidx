"use client";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  FormFieldError,
  FormFieldLabel,
  getFieldId,
  isFieldInvalid,
} from "./form.field";
type FormDatePickerProps = {
  field: AnyFieldApi;
  label: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};
function formatDate(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export function FormDatePicker({
  field,
  label,
  id,
  placeholder = "Select date",
  disabled = false,
  className,
}: FormDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const inputId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);
  const value =
    field.state.value instanceof Date ? field.state.value : undefined;
  return (
    <Field data-invalid={invalid} className='space-y-2'>
      <FormFieldLabel field={field} label={label} id={inputId} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              variant='outline'
              id={inputId}
              type='button'
              disabled={disabled}
              aria-invalid={invalid}
              className={cn(
                "justify-start w-full font-normal text-left",
                !value && "text-muted-foreground",
                className,
              )}
            >
              <CalendarIcon className='mr-2 size-4' />
              {value ? formatDate(value) : placeholder}
            </Button>
          }
        />

        <PopoverContent className='p-0 w-auto overflow-hidden' align='start'>
          <Calendar
            mode='single'
            selected={value}
            defaultMonth={value}
            captionLayout='dropdown'
            disabled={disabled}
            onSelect={(selectedDate) => {
              field.handleChange(selectedDate);
              field.handleBlur();
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <FormFieldError field={field} />
    </Field>
  );
}
