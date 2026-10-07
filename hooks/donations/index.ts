import {
  cancelDonation,
  createDonation,
  getDonation,
  getDonations,
  getMyDonations,
  verifyDonation,
} from "@/api/donations";
import type { UpdateDonationStatusInput } from "@/validators/donation.validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// Verify Donation

type VerifyDonationVariables = {
  donationId: string;
  payload: UpdateDonationStatusInput;
};

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
