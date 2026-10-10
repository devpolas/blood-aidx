import { Suspense } from "react";

import { BloodRequestDetailsPage } from "@/components/blood-request/blood-request-details-page";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function BloodRequestDetailsContent({ params }: PageProps) {
  const { id } = await params;

  return <BloodRequestDetailsPage id={id} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <BloodRequestDetailsContent params={params} />
    </Suspense>
  );
}
