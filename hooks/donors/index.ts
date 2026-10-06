import {
  deleteDonor,
  deleteMyDonorProfile,
  getDonor,
  getDonors,
  getMyDonorProfile,
  updateDonor,
  updateMyDonorProfile,
} from "@/api/donors";

import type { UpdateDonorProfileInput } from "@/validators/donor.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const donorKeys = {
  all: ["donors"] as const,
  me: () => [...donorKeys.all, "me"] as const,
  list: () => [...donorKeys.all, "list"] as const,
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
  return useMutation({
    mutationFn: (payload: UpdateDonorProfileInput) =>
      updateMyDonorProfile(payload),
  });
}

// Delete My Donor Profile
export function useDeleteMyDonorProfile() {
  return useMutation({
    mutationFn: deleteMyDonorProfile,
  });
}

// Donors
export function useDonors() {
  return useQuery({
    queryKey: donorKeys.list(),
    queryFn: getDonors,
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

// Update Donor
export function useUpdateDonor() {
  return useMutation({
    mutationFn: ({
      donorId,
      payload,
    }: {
      donorId: string;
      payload: UpdateDonorProfileInput;
    }) => updateDonor(donorId, payload),
  });
}

// Delete Donor
export function useDeleteDonor() {
  return useMutation({
    mutationFn: (donorId: string) => deleteDonor(donorId),
  });
}
