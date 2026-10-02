"use client";
import { Check, PlusCircle, X } from "lucide-react";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";
import { FormFieldError, FormFieldLabel, getFieldId } from "./form.field";

export type FormMultiCheckboxOption = { label: string; value: string };
type FormMultiCheckboxProps = {
  field: AnyFieldApi;
  label: string;
  options: FormMultiCheckboxOption[];
  id?: string;
  isRequired?: boolean;
  placeholder?: string;
  createNew?: boolean;
  onCreateNew?: () => void;
  disabled?: boolean;
};

export function FormMultiCheckbox({
  field,
  label,
  options,
  id,
  isRequired,
  placeholder = "Search...",
  createNew = false,
  onCreateNew,
  disabled = false,
}: FormMultiCheckboxProps) {

  const inputId = getFieldId(field, id);
  const selectedValues = Array.isArray(field.state.value)
    ? (field.state.value as string[])
    : [];
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value),
  );

  function toggle(value: string) {
    if (selectedValues.includes(value)) {
      field.handleChange(selectedValues.filter((item) => item !== value));
    } else {
      field.handleChange([...selectedValues, value]);
    }
  }
  function remove(value: string) {
    field.handleChange(selectedValues.filter((item) => item !== value));
  }

  return (
    <div className='space-y-4'>
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
        onOpenChange={(open) => {
          if (!open) {
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
              disabled={disabled}
              aria-invalid={
                field.state.meta.isTouched && field.state.meta.errors.length > 0
              }
              className='justify-between w-full'
            >
              <span> Select {label} </span>
              <span className='text-muted-foreground'>
                {selectedValues.length}
              </span>
            </Button>
          }
        />
        <PopoverContent className='p-0 w-90' align='start'>
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const selected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggle(option.value)}
                      className='cursor-pointer'
                    >
                      <div
                        className={cn(
                          "flex justify-center items-center mr-2",
                          "border rounded-sm size-4",
                          selected && "bg-primary text-primary-foreground",
                        )}
                      >
                        {selected && <Check className='size-3' />}
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedOptions.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {selectedOptions.map((item) => (
            <Badge key={item.value} variant='secondary' className='gap-1'>
              {item.label}
              <button
                type='button'
                disabled={disabled}
                onClick={() => remove(item.value)}
                className='hover:text-red-500 hover:cursor-pointer'
                aria-label={`Remove ${item.label}`}
              >
                <X className='size-3' />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <FormFieldError field={field} />
    </div>
  );
}
