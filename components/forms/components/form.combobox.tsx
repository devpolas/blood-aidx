"use client";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  FormFieldError,
  FormFieldLabel,
  getFieldId,
  isFieldInvalid,
} from "./form.field";
import { useState } from "react";
import { Field } from "@/components/ui/field";
export type FormComboboxOption = { label: string; value: string };
type FormComboboxProps = {
  field: AnyFieldApi;
  label: string;
  options: FormComboboxOption[];
  id?: string;
  isRequired?: boolean;
  placeholder?: string;
  createNew?: boolean;
  onCreateNew?: () => void;
  disabled?: boolean;
};

export function FormCombobox({
  field,
  label,
  options,
  id,
  isRequired,
  placeholder = "Search...",
  createNew = false,
  onCreateNew,
  disabled = false,
}: FormComboboxProps) {
  const [open, setOpen] = useState(false);
  const inputId = getFieldId(field, id);
  const invalid = isFieldInvalid(field);
  const selected = options.find((item) => item.value === field.state.value);
  return (
    <Field data-invalid={invalid}>
      <div className='flex justify-between items-center gap-3'>
        <div className='flex items-center gap-0.5'>
          <FormFieldLabel field={field} label={label} id={inputId} />
          {isRequired && (
            <span className='text-destructive' aria-hidden='true'>
              *
            </span>
          )}
        </div>
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
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) {
            field.handleBlur();
          }
        }}
      >
        <PopoverTrigger
          render={
            <Button
              id={inputId}
              type='button'
              variant='outline'
              role='combobox'
              disabled={disabled}
              aria-invalid={invalid}
              className='justify-between w-full'
            >
              {selected?.label ?? placeholder}
              <ChevronsUpDown className='opacity-50 size-4' />
            </Button>
          }
        />
        <PopoverContent className='p-0 w-90' align='start'>
          <Command>
            <CommandInput placeholder={`Search ${label}`} />
            <CommandList>
              <CommandEmpty> No {label} found. </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      field.handleChange(option.value);
                      field.handleBlur();
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto size-4",
                        field.state.value === option.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormFieldError field={field} />
    </Field>
  );
}
