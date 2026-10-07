import {
  adminUpdateUser,
  adminUpdateUserRole,
  banUser,
  deleteMe,
  deleteUser,
  getMe,
  getUser,
  getUserById,
  getUsers,
  unbanUser,
  updateMe,
} from "@/api/user";

import type {
  AdminUpdateUserInput,
  AdminUpdateUserRoleInput,
  AdminUserQueryInput,
  BanUserInput,
} from "@/validators/user.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const userKeys = {
  all: ["users"] as const,

  me: () => [...userKeys.all, "me"] as const,

  list: (query?: AdminUserQueryInput) =>
    [...userKeys.all, "list", query] as const,

  detail: (userId: string) => [...userKeys.all, "detail", userId] as const,
};

// Current User

export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
  });
}

// User By Id

export function useUserById(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
  });
}

// Update Current User

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMe,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}

// Delete Current User

export function useDeleteCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMe,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}

// Users

export function useUsers(query?: AdminUserQueryInput) {
  return useQuery({
    queryKey: userKeys.list(query),
    queryFn: () => getUsers(query),
  });
}

// User

export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
  });
}

type AdminUpdateUserVariables = {
  userId: string;
  payload: AdminUpdateUserInput;
};

// Admin Update User

export function useAdminUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: AdminUpdateUserVariables) =>
      adminUpdateUser(userId, payload),

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(userId),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}

type AdminUpdateUserRoleVariables = {
  userId: string;
  payload: AdminUpdateUserRoleInput;
};

// Admin Update User Role

export function useAdminUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: AdminUpdateUserRoleVariables) =>
      adminUpdateUserRole(userId, payload),

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(userId),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });
    },
  });
}

type BanUserVariables = {
  userId: string;
  payload: BanUserInput;
};

// Ban User

export function useBanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: BanUserVariables) =>
      banUser(userId, payload),

    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(userId),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}

// Unban User

export function useUnbanUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unbanUser,

    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(userId),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}

// Delete User

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: (_, userId) => {
      queryClient.removeQueries({
        queryKey: userKeys.detail(userId),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}
