"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/hooks/auths";

import { clearCallbackUrl, getCallbackUrl } from "@/utils/callback.url";

export default function AuthCallback() {
  const router = useRouter();
  const { isLoading, isError } = useAuthMe();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      clearCallbackUrl();
      router.replace("/signin");
      return;
    }

    const callbackUrl = getCallbackUrl() ?? "/";
    clearCallbackUrl();

    router.replace(callbackUrl);
  }, [isLoading, isError, router]);

  return null;
}
