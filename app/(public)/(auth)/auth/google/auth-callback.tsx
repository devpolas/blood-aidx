"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMe } from "@/hooks/auth";

export default function AuthCallback() {
  const router = useRouter();

  const { isLoading, isError } = useAuthMe();

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      router.replace("/signin");
      return;
    }

    router.replace("/");
  }, [isLoading, isError, router]);

  return null;
}
