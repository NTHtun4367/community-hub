"use client";

import { Input } from "@/components/ui/input";
import CardWrapper from "../../../components/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import { signInSchema, signInSchemaType } from "../schemas";
import { signIn } from "../actions/signin";

function SignInForm() {
  const { execute, isPending } = useAction(signIn, {
    onSuccess: () => {
      toast.success("Sign in successfully!");
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Something went wrong!");
    },
  });

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: signInSchemaType) {
    execute(data);
  }

  return (
    <CardWrapper title="Sign In" description="Sign in to your account.">
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
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
                placeholder="******"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Sign In" isPending={isPending} />
      </form>
    </CardWrapper>
  );
}

export default SignInForm;
