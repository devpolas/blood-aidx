"use client";

import { useAuthMe, useLogout } from "./auth";

export default function useAuth() {
  const meQuery = useAuthMe();
  const logoutMutation = useLogout();

  const user = meQuery.data?.data?.user ?? null;

  const refreshUser = async () => {
    const result = await meQuery.refetch({
      throwOnError: false,
    });

    return result.data?.data?.user ?? null;
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: meQuery.isPending,
    isFetching: meQuery.isFetching,
    error: meQuery.error?.message ?? null,
    refreshUser,
    logout: logoutMutation.mutateAsync,
    isLogoutPending: logoutMutation.isPending,
  };
}
