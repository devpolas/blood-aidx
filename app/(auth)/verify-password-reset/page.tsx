import { Suspense } from "react";

import type { Metadata } from "next";
import VerifyPasswordResetContent from "./verify-password-reset-content";

export const metadata: Metadata = {
  title: "Verify Password Reset",
  description:
    "Verify your password reset code to continue resetting your Blood AidX account password.",
};

export default function VerifyPasswordResetPage() {
  return (
    <Suspense fallback={null}>
      <VerifyPasswordResetContent />
    </Suspense>
  );
}
