"use client";

import { type SyntheticEvent, useState } from "react";
import { Filter, RotateCcw, Search, ChevronDown, X } from "lucide-react";

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
    setIsOpen(false);
  }

  function handleReset() {
    setValues({});
    onReset();
  }

  return (
    <div className='top-16 z-50 sticky'>
      {/* Filter trigger */}
      <div className='z-30 relative flex items-center gap-3 bg-card shadow-sm p-3 sm:px-5 border border-border/70 rounded-2xl'>
        <div className='flex justify-center items-center bg-primary/10 rounded-xl size-10 text-primary shrink-0'>
          <Filter className='size-5' />
        </div>

        <div className='flex-1 min-w-0'>
          <h2 className='font-semibold'>Find what you need</h2>
          <p className='hidden sm:block text-muted-foreground text-sm'>
            Refine the results using the filters below.
          </p>
        </div>

        <button
          type='button'
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls='listing-filter-panel'
          className='inline-flex justify-center items-center gap-2 hover:bg-muted px-3 border border-border rounded-xl h-10 font-medium text-sm transition shrink-0'
        >
          <span className='hidden sm:inline'>
            {isOpen ? "Close filters" : "Filters"}
          </span>

          {isOpen ? (
            <X className='size-4' />
          ) : (
            <ChevronDown className='size-4' />
          )}
        </button>
      </div>

      {/* Floating filter panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type='button'
            aria-label='Close filters'
            onClick={() => setIsOpen(false)}
            className='z-10 fixed inset-0 bg-background/40 backdrop-blur-[2px] cursor-default'
          />

          {/* Panel */}
          <div
            id='listing-filter-panel'
            className='top-full z-20 absolute inset-x-0 bg-card shadow-xl mt-2 p-4 sm:p-5 border border-border/70 rounded-2xl max-h-[calc(100dvh-9rem)] overflow-y-auto overscroll-contain'
          >
            <form onSubmit={handleSubmit}>
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
                          {field.placeholder ??
                            `All ${field.label.toLowerCase()}`}
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
                          field.placeholder ??
                          `Enter ${field.label.toLowerCase()}`
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

              {/* Actions */}
              <div className='flex sm:flex-row flex-col-reverse sm:justify-end gap-3 mt-5 pt-4 border-border/70 border-t'>
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
          </div>
        </>
      )}
    </div>
  );
}
