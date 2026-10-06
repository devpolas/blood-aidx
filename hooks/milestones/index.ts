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
  UpdateMilestoneInput,
} from "@/validators/milestone.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const milestoneKeys = {
  all: ["milestones"] as const,
  list: () => [...milestoneKeys.all, "list"] as const,
  me: () => [...milestoneKeys.all, "me"] as const,
  detail: (milestoneId: string) =>
    [...milestoneKeys.all, "detail", milestoneId] as const,
  user: (userId: string) => [...milestoneKeys.all, "user", userId] as const,
};

// Milestones
export function useMilestones() {
  return useQuery({
    queryKey: milestoneKeys.list(),
    queryFn: getMilestones,
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
export function useMyMilestones() {
  return useQuery({
    queryKey: milestoneKeys.me(),
    queryFn: getMyMilestones,
  });
}

// User Milestones
export function useUserMilestones(userId: string) {
  return useQuery({
    queryKey: milestoneKeys.user(userId),
    queryFn: () => getUserMilestones(userId),
    enabled: Boolean(userId),
  });
}

// Create Milestone
export function useCreateMilestone() {
  return useMutation({
    mutationFn: (payload: CreateMilestoneInput) => createMilestone(payload),
  });
}

// Update Milestone
export function useUpdateMilestone() {
  return useMutation({
    mutationFn: ({
      milestoneId,
      payload,
    }: {
      milestoneId: string;
      payload: UpdateMilestoneInput;
    }) => updateMilestone(milestoneId, payload),
  });
}

// Delete Milestone
export function useDeleteMilestone() {
  return useMutation({
    mutationFn: (milestoneId: string) => deleteMilestone(milestoneId),
  });
}
