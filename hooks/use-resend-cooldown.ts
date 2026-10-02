"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface UseResendCooldownOptions {
  email?: string;
  storageKey: string;
  duration: number;
}

function formatRemainingTime(milliseconds: number) {
  const totalSeconds = Math.ceil(milliseconds / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function useResendCooldown({
  email,
  storageKey,
  duration,
}: UseResendCooldownOptions) {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const key = useMemo(
    () => (email ? `${storageKey}:${email.trim().toLowerCase()}` : storageKey),
    [email, storageKey],
  );

  const clearCooldown = useCallback(() => {
    localStorage.removeItem(key);
    setExpiresAt(null);
    setRemainingTime(0);
  }, [key]);

  const startCooldown = useCallback(() => {
    const nextExpiresAt = Date.now() + duration;

    localStorage.setItem(key, String(nextExpiresAt));
    setExpiresAt(nextExpiresAt);
    setRemainingTime(duration);
  }, [duration, key]);

  useEffect(() => {
    if (!email) {
      setExpiresAt(null);
      setRemainingTime(0);
      return;
    }

    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      setExpiresAt(null);
      setRemainingTime(0);
      return;
    }

    const storedExpiresAt = Number(storedValue);

    if (!Number.isFinite(storedExpiresAt)) {
      localStorage.removeItem(key);
      setExpiresAt(null);
      setRemainingTime(0);
      return;
    }

    const remaining = storedExpiresAt - Date.now();

    if (remaining <= 0) {
      localStorage.removeItem(key);
      setExpiresAt(null);
      setRemainingTime(0);
      return;
    }

    setExpiresAt(storedExpiresAt);
    setRemainingTime(remaining);
  }, [email, key]);

  useEffect(() => {
    if (expiresAt === null) {
      return;
    }

    const updateRemainingTime = () => {
      const remaining = Math.max(expiresAt - Date.now(), 0);

      setRemainingTime(remaining);

      if (remaining === 0) {
        localStorage.removeItem(key);
        setExpiresAt(null);
      }
    };

    updateRemainingTime();

    const timer = window.setInterval(updateRemainingTime, 1_000);

    return () => {
      window.clearInterval(timer);
    };
  }, [expiresAt, key]);

  return {
    remainingTime,
    isCoolingDown: remainingTime > 0,
    formattedTime: formatRemainingTime(remainingTime),
    startCooldown,
    clearCooldown,
  };
}
