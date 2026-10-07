import {
  deleteDonor,
  deleteMyDonorProfile,
  getDonor,
  getDonors,
  getMyDonorProfile,
  updateDonor,
  updateMyDonorProfile,
} from "@/api/donors";

import type {
  DonorQueryInput,
  UpdateDonorProfileInput,
} from "@/validators/donor.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const donorKeys = {
  all: ["donors"] as const,

  me: () => [...donorKeys.all, "me"] as const,

  list: (query?: DonorQueryInput) => [...donorKeys.all, "list", query] as const,

  detail: (donorId: string) => [...donorKeys.all, "detail", donorId] as const,
};

// My Donor Profile

export function useMyDonorProfile() {
  return useQuery({
    queryKey: donorKeys.me(),
    queryFn: getMyDonorProfile,
  });
}

// Update My Donor Profile

export function useUpdateMyDonorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyDonorProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: donorKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: donorKeys.list(),
      });
    },
  });
}

// Delete My Donor Profile

export function useDeleteMyDonorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyDonorProfile,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: donorKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: donorKeys.list(),
      });
    },
  });
}

// Donors

export function useDonors(query?: DonorQueryInput) {
  return useQuery({
    queryKey: donorKeys.list(query),
    queryFn: () => getDonors(query),
  });
}

// Donor

export function useDonor(donorId: string) {
  return useQuery({
    queryKey: donorKeys.detail(donorId),
    queryFn: () => getDonor(donorId),
    enabled: Boolean(donorId),
  });
}

type UpdateDonorVariables = {
  donorId: string;
  payload: UpdateDonorProfileInput;
};

// Update Donor

export function useUpdateDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ donorId, payload }: UpdateDonorVariables) =>
      updateDonor(donorId, payload),

    onSuccess: (_, { donorId }) => {
      queryClient.invalidateQueries({
        queryKey: donorKeys.detail(donorId),
      });

      queryClient.invalidateQueries({
        queryKey: donorKeys.list(),
      });
    },
  });
}

// Delete Donor

export function useDeleteDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDonor,

    onSuccess: (_, donorId) => {
      queryClient.removeQueries({
        queryKey: donorKeys.detail(donorId),
      });

      queryClient.invalidateQueries({
        queryKey: donorKeys.list(),
      });
    },
  });
}
