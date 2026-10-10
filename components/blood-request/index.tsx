"use client";

import { useBloodRequests } from "@/hooks";
import { BloodRequestList } from "@/modules/blood-request/components/blood-request-list";

export function PublicBloodRequestList() {
  const query = useBloodRequests();

  const requests = query.data?.data?.requests ?? [];

  return (
    <BloodRequestList
      requests={requests}
      isLoading={query.isPending}
      isFetching={query.isFetching && !query.isPending}
      error={query.error}
      onRetry={() => void query.refetch()}
    />
  );
}
