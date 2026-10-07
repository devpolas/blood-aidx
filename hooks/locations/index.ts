import {
  createLocation,
  deleteLocation,
  deleteMyLocation,
  getLocation,
  getMyLocation,
  updateMyLocation,
} from "@/api/locations";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: locationKeys.me(),
      });
    },
  });
}

// Update My Location

export function useUpdateMyLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: locationKeys.me(),
      });
    },
  });
}

// Delete My Location

export function useDeleteMyLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyLocation,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: locationKeys.me(),
      });
    },
  });
}

// Delete Location

export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: (_, locationId) => {
      queryClient.removeQueries({
        queryKey: locationKeys.detail(locationId),
      });
    },
  });
}
