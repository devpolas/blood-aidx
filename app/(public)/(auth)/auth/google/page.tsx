import { Suspense } from "react";
import AuthCallback from "./auth-callback";

export default function page() {
  return (
    <Suspense fallback={null}>
      <AuthCallback />
    </Suspense>
  );
}
