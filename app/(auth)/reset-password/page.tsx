import { Suspense } from "react";

import type { Metadata } from "next";
import ResetPasswordContent from "./reset-password-content";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new secure password for your Blood AidX account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
