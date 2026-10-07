import {
  cancelDonation,
  createDonation,
  getDonation,
  getDonations,
  getMyDonations,
  verifyDonation,
} from "@/api/donations";

import type {
  DonationQueryInput,
  UpdateDonationStatusInput,
} from "@/validators/donation.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const donationKeys = {
  all: ["donations"] as const,

  me: (query?: DonationQueryInput) =>
    [...donationKeys.all, "me", query] as const,

  list: (query?: DonationQueryInput) =>
    [...donationKeys.all, "list", query] as const,

  detail: (donationId: string) =>
    [...donationKeys.all, "detail", donationId] as const,
};

// My Donations

export function useMyDonations(query?: DonationQueryInput) {
  return useQuery({
    queryKey: donationKeys.me(query),
    queryFn: () => getMyDonations(query),
  });
}

// Donations

export function useDonations(query?: DonationQueryInput) {
  return useQuery({
    queryKey: donationKeys.list(query),
    queryFn: () => getDonations(query),
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

// Create Donation

export function useCreateDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDonation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: donationKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: donationKeys.list(),
      });
    },
  });
}

// Cancel Donation

export function useCancelDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelDonation,

    onSuccess: (_, donationId) => {
      queryClient.invalidateQueries({
        queryKey: donationKeys.detail(donationId),
      });

      queryClient.invalidateQueries({
        queryKey: donationKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: donationKeys.list(),
      });
    },
  });
}

type VerifyDonationVariables = {
  donationId: string;
  payload: UpdateDonationStatusInput;
};

// Verify Donation

export function useVerifyDonation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ donationId, payload }: VerifyDonationVariables) =>
      verifyDonation(donationId, payload),

    onSuccess: (_, { donationId }) => {
      queryClient.invalidateQueries({
        queryKey: donationKeys.detail(donationId),
      });

      queryClient.invalidateQueries({
        queryKey: donationKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: donationKeys.list(),
      });
    },
  });
}
