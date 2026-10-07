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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

type CreateBloodRequestResponseVariables = {
  requestId: string;
  payload: CreateBloodRequestResponseInput;
};

export function useCreateBloodRequestResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, payload }: CreateBloodRequestResponseVariables) =>
      createBloodRequestResponse(requestId, payload),
    onSuccess: (_, { requestId }) => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.request(requestId),
      });
    },
  });
}

// Update Blood Request Response Status

type UpdateBloodRequestResponseStatusVariables = {
  responseId: string;
  payload: UpdateBloodRequestResponseStatusInput;
};

export function useUpdateBloodRequestResponseStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      responseId,
      payload,
    }: UpdateBloodRequestResponseStatusVariables) =>
      updateBloodRequestResponseStatus(responseId, payload),
    onSuccess: (_, { responseId }) => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.detail(responseId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.all,
      });
    },
  });
}

// Cancel Blood Request Response

export function useCancelBloodRequestResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBloodRequestResponse,
    onSuccess: (_, responseId) => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.detail(responseId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.all,
      });
    },
  });
}

// Delete Blood Request Response

export function useDeleteBloodRequestResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBloodRequestResponse,
    onSuccess: (_, responseId) => {
      queryClient.removeQueries({
        queryKey: bloodRequestResponseKeys.detail(responseId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.me(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestResponseKeys.all,
      });
    },
  });
}
