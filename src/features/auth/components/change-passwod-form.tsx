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
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { signInPath } from "@/path";

function ChangePasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    notFound();
  }

  const { execute, isPending, hasSucceeded } = useAction(changePassword, {
    onSuccess: () => {
      toast.success("Your password has changed.");
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
      token,
    },
  });

  function onSubmit(data: changePasswordSchemaType) {
    execute(data);
  }

  useEffect(() => {
    if (hasSucceeded) {
      router.push(signInPath);
    }
  }, [hasSucceeded]);

  return (
    <CardWrapper
      title="Change Password"
      description="Change your account password."
    >
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
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Change Password" isPending={isPending} />
      </form>
    </CardWrapper>
  );
}

export default ChangePasswordForm;
