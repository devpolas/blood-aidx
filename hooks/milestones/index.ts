import {
  createMilestone,
  deleteMilestone,
  getMilestone,
  getMilestones,
  getMyMilestones,
  getUserMilestones,
  updateMilestone,
} from "@/api/milestones";

import type {
  CreateMilestoneInput,
  MilestoneQueryInput,
  UpdateMilestoneInput,
} from "@/validators/milestone.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const milestoneKeys = {
  all: ["milestones"] as const,

  list: (query?: MilestoneQueryInput) =>
    [...milestoneKeys.all, "list", query] as const,

  me: (query?: MilestoneQueryInput) =>
    [...milestoneKeys.all, "me", query] as const,

  detail: (milestoneId: string) =>
    [...milestoneKeys.all, "detail", milestoneId] as const,

  user: (userId: string, query?: MilestoneQueryInput) =>
    [...milestoneKeys.all, "user", userId, query] as const,
};

// Milestones

export function useMilestones(query?: MilestoneQueryInput) {
  return useQuery({
    queryKey: milestoneKeys.list(query),
    queryFn: () => getMilestones(query),
  });
}

// Milestone

export function useMilestone(milestoneId: string) {
  return useQuery({
    queryKey: milestoneKeys.detail(milestoneId),
    queryFn: () => getMilestone(milestoneId),
    enabled: Boolean(milestoneId),
  });
}

// My Milestones

export function useMyMilestones(query?: MilestoneQueryInput) {
  return useQuery({
    queryKey: milestoneKeys.me(query),
    queryFn: () => getMyMilestones(query),
  });
}

// User Milestones

export function useUserMilestones(userId: string, query?: MilestoneQueryInput) {
  return useQuery({
    queryKey: milestoneKeys.user(userId, query),
    queryFn: () => getUserMilestones(userId, query),
    enabled: Boolean(userId),
  });
}

// Create Milestone

export function useCreateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMilestone,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.me(),
      });
    },
  });
}

type UpdateMilestoneVariables = {
  milestoneId: string;
  payload: UpdateMilestoneInput;
};

// Update Milestone

export function useUpdateMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ milestoneId, payload }: UpdateMilestoneVariables) =>
      updateMilestone(milestoneId, payload),

    onSuccess: (_, { milestoneId }) => {
      queryClient.invalidateQueries({
        queryKey: milestoneKeys.detail(milestoneId),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.me(),
      });
    },
  });
}

// Delete Milestone

export function useDeleteMilestone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMilestone,

    onSuccess: (_, milestoneId) => {
      queryClient.removeQueries({
        queryKey: milestoneKeys.detail(milestoneId),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: milestoneKeys.me(),
      });
    },
  });
}
