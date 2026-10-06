import {
  adminUpdateUser,
  adminUpdateUserRole,
  banUser,
  deleteMe,
  deleteUser,
  getMe,
  getUser,
  getUsers,
  unbanUser,
  updateMe,
} from "@/api/user";

import type {
  AdminUpdateUserInput,
  AdminUpdateUserRoleInput,
  BanUserInput,
} from "@/validators/user.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const userKeys = {
  all: ["users"] as const,
  me: () => [...userKeys.all, "me"] as const,
  list: () => [...userKeys.all, "list"] as const,
  detail: (userId: string) => [...userKeys.all, "detail", userId] as const,
};

// Current User
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
  });
}

// Update Current User
export function useUpdateCurrentUser() {
  return useMutation({
    mutationFn: updateMe,
  });
}

// Delete Current User
export function useDeleteCurrentUser() {
  return useMutation({
    mutationFn: deleteMe,
  });
}

// Users
export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsers,
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

// Admin Update User
export function useAdminUpdateUser() {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: AdminUpdateUserInput;
    }) => adminUpdateUser(userId, payload),
  });
}

// Admin Update User Role
export function useAdminUpdateUserRole() {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: AdminUpdateUserRoleInput;
    }) => adminUpdateUserRole(userId, payload),
  });
}

// Ban User
export function useBanUser() {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: BanUserInput;
    }) => banUser(userId, payload),
  });
}

// Unban User
export function useUnbanUser() {
  return useMutation({
    mutationFn: (userId: string) => unbanUser(userId),
  });
}

// Delete User
export function useDeleteUser() {
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
  });
}
