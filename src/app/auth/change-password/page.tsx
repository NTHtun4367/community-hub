import ChangePasswordForm from "@/features/auth/components/change-passwod-form";
import { Suspense } from "react";

function ChangePasswordPage() {
  return (
    <div className="max-w-xl mx-auto">
      <Suspense fallback={<div className="min-h-72 animate-pulse rounded-xl bg-muted" />}>
        <ChangePasswordForm />
      </Suspense>
    </div>
  );
}

export default ChangePasswordPage;
