"use client";

import { useLogout, useMe } from "./auth";

export default function useAuth() {
  const { data, isLoading, isFetching, error, refetch } = useMe();
  const { mutateAsync: logout, isPending: isLogout } = useLogout();

  const refreshUser = async () => {
    const result = await refetch({
      throwOnError: false,
    });

    return result.data ?? null;
  };

  return {
    user: data?.data?.user ?? null,
    isAuthenticated: !!data?.data?.user,

    isLoading,
    isFetching,
    error: error ? error.message : null,

    refetchUser: refreshUser,

    logout,
    isLogout,
  };
}
