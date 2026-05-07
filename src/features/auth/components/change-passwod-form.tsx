"use client";

import { Input } from "@/components/ui/input";
import CardWrapper from "../../../components/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import { changePassword } from "../actions/change-password";
import {
  changePasswordSchema,
  changePasswordSchemaType,
} from "../schemas/auth.change-password";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthDialog } from "@/components/auth-dialog";
import SignInForm from "./signin-form";

function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  if (!token) {
    notFound();
  }

  const { execute, isPending, hasSucceeded } = useAction(changePassword, {
    onSuccess: () => {
      toast.success("Your password has changed successfully!");
      setIsChanged(true);
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<changePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      newPassword: "",
      token: token || "",
    },
  });

  function onSubmit(data: changePasswordSchemaType) {
    execute(data);
  }

  useEffect(() => {
    if (hasSucceeded) {
      setIsSignInOpen(true);
    }
  }, [hasSucceeded]);

  return (
    <>
      <CardWrapper
        title="Change Password"
        description={
          isChanged
            ? "Your password has been updated. You can now sign in."
            : "Enter your new password below."
        }
      >
        {!isChanged ? (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                  <Input
                    {...field}
                    id="newPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    type="password"
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <SubmitButton label="Change Password" isPending={isPending} />
          </form>
        ) : (
          <div className="py-4 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Click the button below if the login window doesn't appear.
            </p>
            <AuthDialog
              open={isSignInOpen}
              onOpenChange={setIsSignInOpen}
              triggerLabel="Sign In Now"
              variant="default"
            >
              <SignInForm onSwitchView={() => {}} setIsOpen={() => {}} />
            </AuthDialog>
          </div>
        )}
      </CardWrapper>

      {isChanged && (
        <AuthDialog
          open={isSignInOpen}
          onOpenChange={setIsSignInOpen}
          showTrigger={false}
        >
          <SignInForm onSwitchView={() => {}} setIsOpen={() => {}} />
        </AuthDialog>
      )}
    </>
  );
}

export default ChangePasswordForm;
