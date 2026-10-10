import { OrganizationDetails } from "@/modules/organization";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function OrganizationDetailsContent({ params }: PageProps) {
  const { id } = await params;

  return <OrganizationDetails organizationId={id} />;
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <OrganizationDetailsContent params={params} />
    </Suspense>
  );
}
