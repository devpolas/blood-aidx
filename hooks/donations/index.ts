import {
  cancelDonation,
  createDonation,
  getDonation,
  getDonations,
  getMyDonations,
  verifyDonation,
} from "@/api/donations";

import type {
  CreateDonationInput,
  UpdateDonationStatusInput,
} from "@/validators/donation.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const donationKeys = {
  all: ["donations"] as const,
  me: () => [...donationKeys.all, "me"] as const,
  list: () => [...donationKeys.all, "list"] as const,
  detail: (donationId: string) =>
    [...donationKeys.all, "detail", donationId] as const,
};

// My Donations
export function useMyDonations() {
  return useQuery({
    queryKey: donationKeys.me(),
    queryFn: getMyDonations,
  });
}

// Create Donation
export function useCreateDonation() {
  return useMutation({
    mutationFn: (payload: CreateDonationInput) => createDonation(payload),
  });
}

// Cancel Donation
export function useCancelDonation() {
  return useMutation({
    mutationFn: (donationId: string) => cancelDonation(donationId),
  });
}

// Donations
export function useDonations() {
  return useQuery({
    queryKey: donationKeys.list(),
    queryFn: getDonations,
  });
}

// Donation
export function useDonation(donationId: string) {
  return useQuery({
    queryKey: donationKeys.detail(donationId),
    queryFn: () => getDonation(donationId),
    enabled: Boolean(donationId),
  });
}

// Verify Donation
export function useVerifyDonation() {
  return useMutation({
    mutationFn: ({
      donationId,
      payload,
    }: {
      donationId: string;
      payload: UpdateDonationStatusInput;
    }) => verifyDonation(donationId, payload),
  });
}
