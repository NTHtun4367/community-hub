"use client";

import { Input } from "@/components/ui/input";
import CardWrapper from "../../../components/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import { resetPassword } from "../actions/reset-password";
import {
  resetPasswordSchema,
  resetPasswordSchemaType,
} from "../schemas/auth.reset-password";

function ResetPasswordForm() {
  const { execute, isPending } = useAction(resetPassword, {
    onSuccess: () => {
      toast.success("Reset password email sent.");
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: resetPasswordSchemaType) {
    execute(data);
  }

  return (
    <CardWrapper
      title="Reset Password"
      description="Reset password using your email address."
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                aria-invalid={fieldState.invalid}
                placeholder="example@gmail.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Reset Password" isPending={isPending} />
      </form>
    </CardWrapper>
  );
}

export default ResetPasswordForm;
