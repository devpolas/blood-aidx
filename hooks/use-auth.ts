"use client";

import { useLogout, useMe } from "./auth";

export default function useAuth() {
  const { data, isPending, error, refetch } = useMe();
  const { mutateAsync: logout, isPending: isLogoutPending } = useLogout();
  const user = data?.data?.user ?? null;

  const refreshUser = async () => {
    const result = await refetch({
      throwOnError: false,
    });

    return result.data?.data?.user ?? null;
  };

  return {
    user,
    isAuthenticated: !!user,

    isLoading: isPending,
    error: error?.message ?? null,

    refreshUser,

    logout,
    isLogoutPending,
  };
}
