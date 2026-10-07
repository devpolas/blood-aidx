import {
  cancelBloodRequest,
  createBloodRequest,
  deleteBloodRequest,
  getBloodRequest,
  getBloodRequests,
  getMyBloodRequests,
  updateBloodRequest,
  updateBloodRequestStatus,
} from "@/lib/actions/blood.requests";

import type {
  BloodRequestQueryInput,
  UpdateBloodRequestInput,
  UpdateBloodRequestStatusInput,
} from "@/validators/blood.request.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const bloodRequestKeys = {
  all: ["blood-requests"] as const,

  list: (query?: BloodRequestQueryInput) =>
    [...bloodRequestKeys.all, "list", query] as const,

  me: (query?: BloodRequestQueryInput) =>
    [...bloodRequestKeys.all, "me", query] as const,

  detail: (requestId: string) =>
    [...bloodRequestKeys.all, "detail", requestId] as const,
};

// Blood Requests

export function useBloodRequests(query?: BloodRequestQueryInput) {
  return useQuery({
    queryKey: bloodRequestKeys.list(query),
    queryFn: () => getBloodRequests(query),
  });
}

// My Blood Requests

export function useMyBloodRequests(query?: BloodRequestQueryInput) {
  return useQuery({
    queryKey: bloodRequestKeys.me(query),
    queryFn: () => getMyBloodRequests(query),
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBloodRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.me(),
      });
    },
  });
}

type UpdateBloodRequestVariables = {
  requestId: string;
  payload: UpdateBloodRequestInput;
};

// Update Blood Request

export function useUpdateBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, payload }: UpdateBloodRequestVariables) =>
      updateBloodRequest(requestId, payload),

    onSuccess: (_, { requestId }) => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.detail(requestId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.me(),
      });
    },
  });
}

type UpdateBloodRequestStatusVariables = {
  requestId: string;
  payload: UpdateBloodRequestStatusInput;
};

// Update Blood Request Status

export function useUpdateBloodRequestStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, payload }: UpdateBloodRequestStatusVariables) =>
      updateBloodRequestStatus(requestId, payload),

    onSuccess: (_, { requestId }) => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.detail(requestId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.me(),
      });
    },
  });
}

// Cancel Blood Request

export function useCancelBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelBloodRequest,

    onSuccess: (_, requestId) => {
      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.detail(requestId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.me(),
      });
    },
  });
}

// Delete Blood Request

export function useDeleteBloodRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBloodRequest,

    onSuccess: (_, requestId) => {
      queryClient.removeQueries({
        queryKey: bloodRequestKeys.detail(requestId),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: bloodRequestKeys.me(),
      });
    },
  });
}
