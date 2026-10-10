"use client";

import { SyntheticEvent, useState } from "react";
import { Filter, RotateCcw, Search, ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export interface ListingFilterField {
  name: string;
  label: string;
  type?: "search" | "text" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
}

interface ListingQueryFiltersProps {
  fields: ListingFilterField[];
  onApply: (values: Record<string, string>) => void;
  onReset: () => void;
}

export function ListingQueryFilters({
  fields,
  onApply,
  onReset,
}: ListingQueryFiltersProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    onApply(values);
  }

  function handleReset() {
    setValues({});
    onReset();
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className='top-16 z-40 sticky bg-card shadow-sm border border-border/70 rounded-2xl'
    >
      <div className='flex items-center gap-3 p-1 sm:px-5'>
        <div className='flex justify-center items-center bg-primary/10 rounded-xl size-10 text-primary shrink-0'>
          <Filter className='size-5' />
        </div>

        <div className='flex-1 min-w-0'>
          <h2 className='font-semibold'>Find what you need</h2>
          <p className='text-muted-foreground text-sm'>
            Refine the results using the filters below.
          </p>
        </div>

        <CollapsibleTrigger
          render={
            <button
              type='button'
              aria-label={isOpen ? "Hide filters" : "Show filters"}
              className='inline-flex justify-center items-center gap-2 hover:bg-muted px-3 rounded-xl sm:w-auto sm:h-10 size-10 transition'
            >
              <span className='hidden sm:inline font-medium text-sm'>
                {isOpen ? "Hide filters" : "Show filters"}
              </span>
              <ChevronDown
                className={`size-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          }
        />
      </div>

      <CollapsibleContent>
        <form onSubmit={handleSubmit} className='px-4 sm:px-5 pb-4 sm:pb-5'>
          <div className='gap-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {fields.map((field) => (
              <div key={field.name} className='space-y-2 min-w-0'>
                <label
                  htmlFor={`listing-filter-${field.name}`}
                  className='font-medium text-sm'
                >
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    id={`listing-filter-${field.name}`}
                    value={values[field.name] ?? ""}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                    className='bg-background px-3 border border-input focus-visible:border-primary rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/30 w-full h-11 text-sm transition'
                  >
                    <option value=''>
                      {field.placeholder ?? `All ${field.label.toLowerCase()}`}
                    </option>

                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`listing-filter-${field.name}`}
                    type={field.type === "search" ? "search" : "text"}
                    value={values[field.name] ?? ""}
                    placeholder={
                      field.placeholder ?? `Enter ${field.label.toLowerCase()}`
                    }
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        [field.name]: event.target.value,
                      }))
                    }
                    className='bg-background px-3 border border-input focus-visible:border-primary rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/30 w-full h-11 placeholder:text-muted-foreground text-sm transition'
                  />
                )}
              </div>
            ))}
          </div>

          <div className='flex sm:flex-row flex-col sm:justify-end gap-3 mt-5 pt-4 border-border/70 border-t'>
            <button
              type='button'
              onClick={handleReset}
              className='inline-flex justify-center items-center gap-2 hover:bg-muted px-4 border border-border rounded-xl min-h-10 font-medium text-sm transition'
            >
              <RotateCcw className='size-4' />
              Reset filters
            </button>

            <button
              type='submit'
              className='inline-flex justify-center items-center gap-2 bg-primary hover:opacity-90 px-5 rounded-xl min-h-10 font-semibold text-primary-foreground text-sm transition'
            >
              <Search className='size-4' />
              Apply filters
            </button>
          </div>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
