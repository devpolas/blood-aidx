import { BloodRequestDetailsPage } from "@/components/blood-request/blood-request-details-page";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsResolve = await params;
  const id = paramsResolve.id;
  return (
    <Suspense fallback={null}>
      <BloodRequestDetailsPage id={id} />
    </Suspense>
  );
}
