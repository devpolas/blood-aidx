import {
  createReview,
  deleteReview,
  getMyReviews,
  getReview,
  getReviewsForOrganization,
  getReviewsForUser,
  updateReview,
  updateReviewStatus,
} from "@/api/reviews";

import type {
  CreateReviewInput,
  ReviewQueryInput,
  UpdateReviewInput,
  UpdateReviewStatusInput,
} from "@/validators/review.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const reviewKeys = {
  all: ["reviews"] as const,

  me: (query?: ReviewQueryInput) => [...reviewKeys.all, "me", query] as const,

  detail: (reviewId: string) =>
    [...reviewKeys.all, "detail", reviewId] as const,

  user: (userId: string, query?: ReviewQueryInput) =>
    [...reviewKeys.all, "user", userId, query] as const,

  organization: (organizationId: string, query?: ReviewQueryInput) =>
    [...reviewKeys.all, "organization", organizationId, query] as const,
};

// My Reviews

export function useMyReviews(query?: ReviewQueryInput) {
  return useQuery({
    queryKey: reviewKeys.me(query),
    queryFn: () => getMyReviews(query),
  });
}

// Reviews For User

export function useReviewsForUser(userId: string, query?: ReviewQueryInput) {
  return useQuery({
    queryKey: reviewKeys.user(userId, query),
    queryFn: () => getReviewsForUser(userId, query),
    enabled: Boolean(userId),
  });
}

// Reviews For Organization

export function useReviewsForOrganization(
  organizationId: string,
  query?: ReviewQueryInput,
) {
  return useQuery({
    queryKey: reviewKeys.organization(organizationId, query),
    queryFn: () => getReviewsForOrganization(organizationId, query),
    enabled: Boolean(organizationId),
  });
}

// Review

export function useReview(reviewId: string) {
  return useQuery({
    queryKey: reviewKeys.detail(reviewId),
    queryFn: () => getReview(reviewId),
    enabled: Boolean(reviewId),
  });
}

// Create Review

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.me(),
      });
    },
  });
}

type UpdateReviewVariables = {
  reviewId: string;
  payload: UpdateReviewInput;
};

// Update Review

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, payload }: UpdateReviewVariables) =>
      updateReview(reviewId, payload),

    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.detail(reviewId),
      });

      queryClient.invalidateQueries({
        queryKey: reviewKeys.me(),
      });
    },
  });
}

type UpdateReviewStatusVariables = {
  reviewId: string;
  payload: UpdateReviewStatusInput;
};

// Update Review Status

export function useUpdateReviewStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, payload }: UpdateReviewStatusVariables) =>
      updateReviewStatus(reviewId, payload),

    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries({
        queryKey: reviewKeys.detail(reviewId),
      });

      queryClient.invalidateQueries({
        queryKey: reviewKeys.me(),
      });
    },
  });
}

// Delete Review

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,

    onSuccess: (_, reviewId) => {
      queryClient.removeQueries({
        queryKey: reviewKeys.detail(reviewId),
      });

      queryClient.invalidateQueries({
        queryKey: reviewKeys.me(),
      });
    },
  });
}
