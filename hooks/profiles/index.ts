import {
  deleteMyProfile,
  deleteProfile,
  getMyProfile,
  getProfile,
  updateMyProfile,
  updateProfile,
} from "@/api/profiles";
import type { UpdateProfileInput } from "@/validators/profile.validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.me(),
      });
    },
  });
}

// Delete My Profile
export function useDeleteMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyProfile,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: profileKeys.me(),
      });
    },
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

type UpdateProfileVariables = {
  userId: string;
  payload: UpdateProfileInput;
};

// Update Profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: UpdateProfileVariables) =>
      updateProfile(userId, payload),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: profileKeys.detail(userId),
      });
    },
  });
}

// Delete Profile
export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: (_, userId) => {
      queryClient.removeQueries({
        queryKey: profileKeys.detail(userId),
      });
    },
  });
}
