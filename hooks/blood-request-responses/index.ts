import {
  cancelBloodRequestResponse,
  createBloodRequestResponse,
  deleteBloodRequestResponse,
  getBloodRequestResponse,
  getBloodRequestResponses,
  getMyBloodRequestResponses,
  updateBloodRequestResponseStatus,
} from "@/api/blood.request.responses";

import type {
  CreateBloodRequestResponseInput,
  UpdateBloodRequestResponseStatusInput,
} from "@/validators/blood.request.response.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const bloodRequestResponseKeys = {
  all: ["blood-request-responses"] as const,
  me: () => [...bloodRequestResponseKeys.all, "me"] as const,
  request: (requestId: string) =>
    [...bloodRequestResponseKeys.all, "request", requestId] as const,
  detail: (responseId: string) =>
    [...bloodRequestResponseKeys.all, "detail", responseId] as const,
};

// My Blood Request Responses
export function useMyBloodRequestResponses() {
  return useQuery({
    queryKey: bloodRequestResponseKeys.me(),
    queryFn: getMyBloodRequestResponses,
  });
}

// Blood Request Responses
export function useBloodRequestResponses(requestId: string) {
  return useQuery({
    queryKey: bloodRequestResponseKeys.request(requestId),
    queryFn: () => getBloodRequestResponses(requestId),
    enabled: Boolean(requestId),
  });
}

// Blood Request Response
export function useBloodRequestResponse(responseId: string) {
  return useQuery({
    queryKey: bloodRequestResponseKeys.detail(responseId),
    queryFn: () => getBloodRequestResponse(responseId),
    enabled: Boolean(responseId),
  });
}

// Create Blood Request Response
export function useCreateBloodRequestResponse() {
  return useMutation({
    mutationFn: ({
      requestId,
      payload,
    }: {
      requestId: string;
      payload: CreateBloodRequestResponseInput;
    }) => createBloodRequestResponse(requestId, payload),
  });
}

// Update Blood Request Response Status
export function useUpdateBloodRequestResponseStatus() {
  return useMutation({
    mutationFn: ({
      responseId,
      payload,
    }: {
      responseId: string;
      payload: UpdateBloodRequestResponseStatusInput;
    }) => updateBloodRequestResponseStatus(responseId, payload),
  });
}

// Cancel Blood Request Response
export function useCancelBloodRequestResponse() {
  return useMutation({
    mutationFn: (responseId: string) => cancelBloodRequestResponse(responseId),
  });
}

// Delete Blood Request Response
export function useDeleteBloodRequestResponse() {
  return useMutation({
    mutationFn: (responseId: string) => deleteBloodRequestResponse(responseId),
  });
}
