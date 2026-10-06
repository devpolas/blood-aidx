import {
  createLocation,
  deleteLocation,
  deleteMyLocation,
  getLocation,
  getMyLocation,
  updateMyLocation,
} from "@/api/locations";

import type {
  LocationCreateInput,
  LocationUpdateInput,
} from "@/validators/location.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const locationKeys = {
  all: ["locations"] as const,
  me: () => [...locationKeys.all, "me"] as const,
  detail: (locationId: string) =>
    [...locationKeys.all, "detail", locationId] as const,
};

// My Location
export function useMyLocation() {
  return useQuery({
    queryKey: locationKeys.me(),
    queryFn: getMyLocation,
  });
}

// Location
export function useLocation(locationId: string) {
  return useQuery({
    queryKey: locationKeys.detail(locationId),
    queryFn: () => getLocation(locationId),
    enabled: Boolean(locationId),
  });
}

// Create Location
export function useCreateLocation() {
  return useMutation({
    mutationFn: (payload: LocationCreateInput) => createLocation(payload),
  });
}

// Update My Location
export function useUpdateMyLocation() {
  return useMutation({
    mutationFn: (payload: LocationUpdateInput) => updateMyLocation(payload),
  });
}

// Delete My Location
export function useDeleteMyLocation() {
  return useMutation({
    mutationFn: deleteMyLocation,
  });
}

// Delete Location
export function useDeleteLocation() {
  return useMutation({
    mutationFn: (locationId: string) => deleteLocation(locationId),
  });
}
