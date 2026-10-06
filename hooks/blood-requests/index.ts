import {
  cancelBloodRequest,
  createBloodRequest,
  deleteBloodRequest,
  getBloodRequest,
  getBloodRequests,
  getMyBloodRequests,
  updateBloodRequest,
  updateBloodRequestStatus,
} from "@/api/blood.requests";

import type {
  CreateBloodRequestInput,
  UpdateBloodRequestInput,
  UpdateBloodRequestStatusInput,
} from "@/validators/blood.request.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const bloodRequestKeys = {
  all: ["blood-requests"] as const,
  list: () => [...bloodRequestKeys.all, "list"] as const,
  me: () => [...bloodRequestKeys.all, "me"] as const,
  detail: (requestId: string) =>
    [...bloodRequestKeys.all, "detail", requestId] as const,
};

// Blood Requests
export function useBloodRequests() {
  return useQuery({
    queryKey: bloodRequestKeys.list(),
    queryFn: getBloodRequests,
  });
}

// My Blood Requests
export function useMyBloodRequests() {
  return useQuery({
    queryKey: bloodRequestKeys.me(),
    queryFn: getMyBloodRequests,
  });
}

// Blood Request
export function useBloodRequest(requestId: string) {
  return useQuery({
    queryKey: bloodRequestKeys.detail(requestId),
    queryFn: () => getBloodRequest(requestId),
    enabled: Boolean(requestId),
  });
}

// Create Blood Request
export function useCreateBloodRequest() {
  return useMutation({
    mutationFn: (payload: CreateBloodRequestInput) =>
      createBloodRequest(payload),
  });
}

// Update Blood Request
export function useUpdateBloodRequest() {
  return useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string;
      payload: UpdateBloodRequestInput;
    }) => updateBloodRequest(requestId, payload),
  });
}

// Update Blood Request Status
export function useUpdateBloodRequestStatus() {
  return useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string;
      payload: UpdateBloodRequestStatusInput;
    }) => updateBloodRequestStatus(requestId, payload),
  });
}

// Cancel Blood Request
export function useCancelBloodRequest() {
  return useMutation({
    mutationFn: (requestId: string) => cancelBloodRequest(requestId),
  });
}

// Delete Blood Request
export function useDeleteBloodRequest() {
  return useMutation({
    mutationFn: (requestId: string) => deleteBloodRequest(requestId),
  });
}
