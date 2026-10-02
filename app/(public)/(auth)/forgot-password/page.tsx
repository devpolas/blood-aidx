import { Suspense } from "react";

import type { Metadata } from "next";

import ForgotPasswordContent from "./forgot-password-content";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your Blood AidX account password securely and regain access to your account.",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
