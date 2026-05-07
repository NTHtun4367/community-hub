"use client";

import { Input } from "@/components/ui/input";
import CardWrapper from "../../../components/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SubmitButton from "../../../components/submit-button";
import { signUpSchema, signUpSchemaType } from "../schemas";
import { signUp } from "../actions/signup";
import { Separator } from "@/components/ui/separator";
import OAuthButtons from "./oauth-buttons";

interface SignUpFormProps {
  onSwitchView: () => void;
}

function SignUpForm({ onSwitchView }: SignUpFormProps) {
  const { execute, isPending } = useAction(signUp, {
    onSuccess: () => {
      toast.success("Sign up successfully! Please sign in.");
      onSwitchView();
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(data: signUpSchemaType) {
    execute(data);
  }

  return (
    <CardWrapper
      title="Sign Up"
      description="Create your new account."
      footer={
        <p className="text-sm text-muted-foreground font-medium">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchView}
            className="underline hover:text-primary transition-colors"
          >
            Sign in
          </button>
        </p>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                {...field}
                id="name"
                aria-invalid={fieldState.invalid}
                placeholder="John Doe"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                type="password"
                placeholder="******"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <Input
                {...field}
                id="confirmPassword"
                type="password"
                placeholder="******"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <SubmitButton label="Sign Up" isPending={isPending} />
      </form>
      <div className="w-full flex items-center gap-3 my-4">
        <Separator className="flex-1" />
        <p className="text-sm text-muted-foreground">or</p>
        <Separator className="flex-1" />
      </div>
      <OAuthButtons />
    </CardWrapper>
  );
}

export default SignUpForm;
