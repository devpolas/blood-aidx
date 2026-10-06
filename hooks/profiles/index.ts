import {
  deleteMyProfile,
  deleteProfile,
  getMyProfile,
  getProfile,
  updateMyProfile,
  updateProfile,
} from "@/api/profiles";

import type { UpdateProfileInput } from "@/validators/profile.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const profileKeys = {
  all: ["profiles"] as const,
  me: () => [...profileKeys.all, "me"] as const,
  detail: (userId: string) => [...profileKeys.all, "detail", userId] as const,
};

// My Profile
export function useMyProfile() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: getMyProfile,
  });
}

// Update My Profile
export function useUpdateMyProfile() {
  return useMutation({
    mutationFn: (payload: UpdateProfileInput) => updateMyProfile(payload),
  });
}

// Delete My Profile
export function useDeleteMyProfile() {
  return useMutation({
    mutationFn: deleteMyProfile,
  });
}

// Profile
export function useProfile(userId: string) {
  return useQuery({
    queryKey: profileKeys.detail(userId),
    queryFn: () => getProfile(userId),
    enabled: Boolean(userId),
  });
}

// Update Profile
export function useUpdateProfile() {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateProfileInput;
    }) => updateProfile(userId, payload),
  });
}

// Delete Profile
export function useDeleteProfile() {
  return useMutation({
    mutationFn: (userId: string) => deleteProfile(userId),
  });
}
