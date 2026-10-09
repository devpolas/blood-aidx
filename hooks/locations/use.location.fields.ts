"use client";

import { useCallback, useMemo, useState } from "react";
import type { FormSelectOption } from "@/components/forms/components/form.select";
import { useCountries, useRegions, useSettlements } from "./use.world.place";

export type WorldLocationValue = {
  country: string;
  division: string;
  city: string;
};

export type WorldLocationNames = {
  country: string;
  division: string;
  city: string;
};

export const EMPTY_WORLD_LOCATION: WorldLocationValue = {
  country: "",
  division: "",
  city: "",
};

export function useLocationFields(
  initialValue: WorldLocationValue = EMPTY_WORLD_LOCATION,
) {
  const [location, setLocation] = useState<WorldLocationValue>(() => ({
    country: initialValue.country,
    division: initialValue.division,
    city: initialValue.city,
  }));

  const setCountry = useCallback((country: string) => {
    setLocation({ country, division: "", city: "" });
  }, []);

  const setDivision = useCallback((division: string) => {
    setLocation((current) => ({
      ...current,
      division,
      city: "",
    }));
  }, []);

  const setCity = useCallback((city: string) => {
    setLocation((current) => ({ ...current, city }));
  }, []);

  const resetLocation = useCallback(() => {
    setLocation({ ...EMPTY_WORLD_LOCATION });
  }, []);

  return {
    location,
    setLocation,
    setCountry,
    setDivision,
    setCity,
    resetLocation,
  };
}

export function useWorldLocationNames(location: WorldLocationValue) {
  const countries = useCountries();
  const regions = useRegions(location.country || undefined);

  const regionId = /^\d+$/.test(location.division)
    ? Number(location.division)
    : undefined;

  const validRegionId =
    regionId !== undefined && Number.isSafeInteger(regionId) && regionId > 0
      ? regionId
      : undefined;

  const settlements = useSettlements(
    location.country || undefined,
    validRegionId,
  );

  const { country: countryCode, division: divisionId, city: cityId } = location;

  const names = useMemo<WorldLocationNames | null>(() => {
    if (!countryCode || !divisionId || !cityId) {
      return null;
    }

    const country = countries.options.find(
      (option: FormSelectOption) => option.value === countryCode,
    );

    const division = regions.options.find(
      (option: FormSelectOption) => option.value === divisionId,
    );

    const city = settlements.options.find(
      (option: FormSelectOption) => option.value === cityId,
    );

    if (!country || !division || !city) {
      return null;
    }

    return {
      country: country.label,
      division: division.label,
      city: city.label,
    };
  }, [
    countryCode,
    divisionId,
    cityId,
    countries.options,
    regions.options,
    settlements.options,
  ]);

  const isLoading =
    countries.isLoading ||
    (Boolean(countryCode) && regions.isLoading) ||
    (Boolean(countryCode && validRegionId) && settlements.isLoading);

  const error = countries.error ?? regions.error ?? settlements.error ?? null;

  return {
    names,
    isLoading,
    error,
    isReady: names !== null && !isLoading,
  };
}
