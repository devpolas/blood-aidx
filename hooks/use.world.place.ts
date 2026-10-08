import { FormSelectOption } from "@/components/forms/components/form.select";
import {
  getCountries,
  getRegions,
  getSettlements,
} from "@/lib/actions/locations";

import { useQuery } from "@tanstack/react-query";

const locationKeys = {
  all: ["place-db-locations"] as const,

  countries: () => [...locationKeys.all, "countries"] as const,

  regions: (countryCode: string) =>
    [...locationKeys.all, "regions", countryCode] as const,

  settlements: (countryCode: string, regionId: number) =>
    [...locationKeys.all, "settlements", countryCode, regionId] as const,
};

export function useCountries() {
  const query = useQuery({
    queryKey: locationKeys.countries(),
    queryFn: getCountries,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  });

  const options: FormSelectOption[] =
    query.data?.countries.map((country) => ({
      label: country.name,
      value: country.code,
    })) ?? [];

  return {
    ...query,
    options,
  };
}

export function useRegions(countryCode?: string) {
  const query = useQuery({
    queryKey: locationKeys.regions(countryCode ?? ""),
    queryFn: () => getRegions(countryCode!),
    enabled: Boolean(countryCode),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  });

  const options: FormSelectOption[] =
    query.data?.regions.map((region) => ({
      label: region.name,
      value: String(region.id),
    })) ?? [];

  return {
    ...query,
    options,
  };
}

export function useSettlements(countryCode?: string, regionId?: number) {
  const query = useQuery({
    queryKey: locationKeys.settlements(countryCode ?? "", regionId ?? 0),
    queryFn: () => getSettlements(countryCode!, regionId!),
    enabled: Boolean(countryCode && regionId),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  });

  const options: FormSelectOption[] =
    query.data?.settlements.map((settlement) => ({
      label: settlement.name,
      value: String(settlement.id),
    })) ?? [];

  return {
    ...query,
    options,
  };
}
