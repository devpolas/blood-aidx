"use client";

import { useQuery } from "@tanstack/react-query";
import type { FormSelectOption } from "@/components/forms/components/form.select";

import {
  getCountries,
  getRegions,
  getSettlements,
} from "@/lib/actions/locations";

const locationKeys = {
  all: ["place-db-locations"] as const,
  countries: () => [...locationKeys.all, "countries"] as const,
  regions: (countryCode: string) =>
    [...locationKeys.all, "regions", countryCode] as const,
  settlements: (countryCode: string, regionId: number) =>
    [...locationKeys.all, "settlements", countryCode, regionId] as const,
};

const CACHE_OPTIONS = {
  staleTime: 24 * 60 * 60 * 1000,
  gcTime: 7 * 24 * 60 * 60 * 1000,
};

export function useCountries() {
  const query = useQuery({
    queryKey: locationKeys.countries(),
    queryFn: getCountries,
    ...CACHE_OPTIONS,
  });

  const options: FormSelectOption[] =
    query.data?.countries.map((country) => ({
      label: country.name,
      value: country.code,
    })) ?? [];

  return { ...query, options };
}

export function useRegions(countryCode?: string) {
  const validCountryCode = countryCode?.trim() || undefined;

  const query = useQuery({
    queryKey: locationKeys.regions(validCountryCode ?? ""),
    queryFn: () => getRegions(validCountryCode!),
    enabled: Boolean(validCountryCode),
    ...CACHE_OPTIONS,
  });

  const options: FormSelectOption[] =
    query.data?.regions.map((region) => ({
      label: region.name,
      value: String(region.id),
    })) ?? [];

  return { ...query, options };
}

export function useSettlements(countryCode?: string, regionId?: number) {
  const validCountryCode = countryCode?.trim() || undefined;

  const validRegionId =
    regionId !== undefined && Number.isSafeInteger(regionId) && regionId > 0
      ? regionId
      : undefined;

  const query = useQuery({
    queryKey: locationKeys.settlements(
      validCountryCode ?? "",
      validRegionId ?? 0,
    ),
    queryFn: () => getSettlements(validCountryCode!, validRegionId!),
    enabled: Boolean(validCountryCode && validRegionId !== undefined),
    ...CACHE_OPTIONS,
  });

  const options: FormSelectOption[] =
    query.data?.settlements.map((settlement) => ({
      label: settlement.name,
      value: String(settlement.id),
    })) ?? [];

  return { ...query, options };
}
