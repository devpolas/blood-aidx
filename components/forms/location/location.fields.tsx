"use client";

import { useEffect, useRef } from "react";

import { useForm } from "@tanstack/react-form";

import { FormSelect } from "@/components/forms/components/form.select";

import {
  useLocationFields,
  useWorldLocationNames,
  type WorldLocationNames,
} from "@/hooks/locations/use.location.fields";

import {
  useCountries,
  useRegions,
  useSettlements,
} from "@/hooks/locations/use.world.place";

type LocationFieldsProps = {
  initialNames?: WorldLocationNames;
  disabled?: boolean;
  onNamesChange: (names: WorldLocationNames | null) => void;
};

export function LocationFields({
  initialNames,
  disabled = false,
  onNamesChange,
}: LocationFieldsProps) {
  const { location, setCountry, setDivision, setCity } = useLocationFields();

  const countries = useCountries();
  const regions = useRegions(location.country || undefined);

  const regionId =
    /^\d+$/.test(location.division) &&
    Number.isSafeInteger(Number(location.division)) &&
    Number(location.division) > 0
      ? Number(location.division)
      : undefined;

  const settlements = useSettlements(location.country || undefined, regionId);

  const { names } = useWorldLocationNames(location);

  const countryRestored = useRef(false);
  const divisionRestored = useRef(false);
  const cityRestored = useRef(false);

  const countryForm = useForm({
    defaultValues: { country: location.country },
  });

  const divisionForm = useForm({
    defaultValues: { division: location.division },
  });

  const cityForm = useForm({
    defaultValues: { city: location.city },
  });

  // Keep FormSelect values synchronized with PlaceDB state.
  useEffect(() => {
    countryForm.setFieldValue("country", location.country);
  }, [countryForm, location.country]);

  useEffect(() => {
    divisionForm.setFieldValue("division", location.division);
  }, [divisionForm, location.division]);

  useEffect(() => {
    cityForm.setFieldValue("city", location.city);
  }, [cityForm, location.city]);

  // Restore the saved country name to its PlaceDB value.
  useEffect(() => {
    if (countryRestored.current || !initialNames?.country || !countries.data) {
      return;
    }

    const savedCountry = initialNames.country.toLowerCase();

    const country = countries.options.find(
      (option) =>
        option.value === initialNames.country ||
        option.label.toLowerCase() === savedCountry,
    );

    countryRestored.current = true;

    if (country) {
      setCountry(country.value);
    }
  }, [initialNames?.country, countries.data, countries.options, setCountry]);

  // Restore the saved division name to its PlaceDB ID.
  useEffect(() => {
    if (
      divisionRestored.current ||
      !location.country ||
      !initialNames?.division ||
      !regions.data
    ) {
      return;
    }

    const savedDivision = initialNames.division.toLowerCase();

    const division = regions.options.find(
      (option) =>
        option.value === initialNames.division ||
        option.label.toLowerCase() === savedDivision,
    );

    divisionRestored.current = true;

    if (division) {
      setDivision(division.value);
    }
  }, [
    location.country,
    initialNames?.division,
    regions.data,
    regions.options,
    setDivision,
  ]);

  // Restore the saved city name to its PlaceDB ID.
  useEffect(() => {
    if (
      cityRestored.current ||
      !location.country ||
      !location.division ||
      !initialNames?.city ||
      !settlements.data
    ) {
      return;
    }

    const savedCity = initialNames.city.toLowerCase();

    const city = settlements.options.find(
      (option) =>
        option.value === initialNames.city ||
        option.label.toLowerCase() === savedCity,
    );

    cityRestored.current = true;

    if (city) {
      setCity(city.value);
    }
  }, [
    location.country,
    location.division,
    initialNames?.city,
    settlements.data,
    settlements.options,
    setCity,
  ]);

  useEffect(() => {
    onNamesChange(names);
  }, [names, onNamesChange]);

  return (
    <div className='gap-4 grid grid-cols-1 md:grid-cols-3'>
      <countryForm.Field name='country'>
        {(field) => (
          <FormSelect
            field={field}
            label='Country'
            placeholder={
              countries.isLoading ? "Loading countries..." : "Select country"
            }
            options={countries.options}
            disabled={disabled || countries.isLoading}
            isRequired
            onValueChange={setCountry}
          />
        )}
      </countryForm.Field>

      <divisionForm.Field name='division'>
        {(field) => (
          <FormSelect
            field={field}
            label='Division / State'
            placeholder={
              !location.country
                ? "Select country first"
                : regions.isLoading
                  ? "Loading divisions..."
                  : "Select division"
            }
            options={regions.options}
            disabled={disabled || !location.country || regions.isLoading}
            isRequired
            onValueChange={setDivision}
          />
        )}
      </divisionForm.Field>

      <div>
        <cityForm.Field name='city'>
          {(field) => (
            <FormSelect
              field={field}
              label='City'
              placeholder={
                !location.division
                  ? "Select division first"
                  : settlements.isLoading
                    ? "Loading cities..."
                    : "Select city"
              }
              options={settlements.options}
              disabled={
                disabled ||
                !location.country ||
                !location.division ||
                settlements.isLoading
              }
              isRequired
              onValueChange={setCity}
            />
          )}
        </cityForm.Field>
      </div>

      {countries.error && (
        <p className='sm:col-span-2 text-destructive text-sm'>
          Failed to load countries. Please try again.
        </p>
      )}

      {regions.error && (
        <p className='sm:col-span-2 text-destructive text-sm'>
          Failed to load divisions. Please try again.
        </p>
      )}

      {settlements.error && (
        <p className='sm:col-span-2 text-destructive text-sm'>
          Failed to load cities. Please try again.
        </p>
      )}
    </div>
  );
}
