"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAuthMe } from "@/hooks/auths";
import { clearCallbackUrl, getCallbackUrl } from "@/utils/callback.url";

export default function AuthCallback() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  const { isLoading, isError, isSuccess } = useAuthMe();

  useEffect(() => {
    if (isLoading || hasRedirected.current) {
      return;
    }

    hasRedirected.current = true;

    if (isError || !isSuccess) {
      clearCallbackUrl();
      router.replace("/signin");
      return;
    }

    const callbackUrl = getCallbackUrl() ?? "/";

    clearCallbackUrl();
    router.replace(callbackUrl);
  }, [isLoading, isError, isSuccess, router]);

  return null;
}
