import { Suspense } from "react";

import { DonorDetails } from "@/modules/donors/donor-details";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function DonorDetailsContent({ params }: PageProps) {
  const { id } = await params;

  return <DonorDetails donorId={id} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <DonorDetailsContent params={params} />
    </Suspense>
  );
}
