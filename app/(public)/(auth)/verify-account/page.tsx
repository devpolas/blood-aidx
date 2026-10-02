import { Suspense } from "react";
import type { Metadata } from "next";
import VerifyAccountContent from "./verify-account-content";

export const metadata: Metadata = {
  title: "Verify Account",
  description:
    "Verify your Blood AidX account to find donors, respond to blood requests, and help save lives.",
};

export default function VerifyAccountPage() {
  return (
    <Suspense fallback={null}>
      <VerifyAccountContent />
    </Suspense>
  );
}
