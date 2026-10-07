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
  UpdateBloodRequestInput,
  UpdateBloodRequestStatusInput,
} from "@/validators/blood.request.validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// Update Blood Request

type UpdateBloodRequestVariables = {
  requestId: string;
  payload: UpdateBloodRequestInput;
};

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

// Update Blood Request Status

type UpdateBloodRequestStatusVariables = {
  requestId: string;
  payload: UpdateBloodRequestStatusInput;
};

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
