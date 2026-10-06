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
  UpdateReviewInput,
  UpdateReviewStatusInput,
} from "@/validators/review.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const reviewKeys = {
  all: ["reviews"] as const,
  me: () => [...reviewKeys.all, "me"] as const,
  detail: (reviewId: string) =>
    [...reviewKeys.all, "detail", reviewId] as const,
  user: (userId: string) => [...reviewKeys.all, "user", userId] as const,
  organization: (organizationId: string) =>
    [...reviewKeys.all, "organization", organizationId] as const,
};

// My Reviews
export function useMyReviews() {
  return useQuery({
    queryKey: reviewKeys.me(),
    queryFn: getMyReviews,
  });
}

// Reviews For User
export function useReviewsForUser(userId: string) {
  return useQuery({
    queryKey: reviewKeys.user(userId),
    queryFn: () => getReviewsForUser(userId),
    enabled: Boolean(userId),
  });
}

// Reviews For Organization
export function useReviewsForOrganization(organizationId: string) {
  return useQuery({
    queryKey: reviewKeys.organization(organizationId),
    queryFn: () => getReviewsForOrganization(organizationId),
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
  return useMutation({
    mutationFn: (payload: CreateReviewInput) => createReview(payload),
  });
}

// Update Review
export function useUpdateReview() {
  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string;
      payload: UpdateReviewInput;
    }) => updateReview(reviewId, payload),
  });
}

// Update Review Status
export function useUpdateReviewStatus() {
  return useMutation({
    mutationFn: ({
      reviewId,
      payload,
    }: {
      reviewId: string;
      payload: UpdateReviewStatusInput;
    }) => updateReviewStatus(reviewId, payload),
  });
}

// Delete Review
export function useDeleteReview() {
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
  });
}
