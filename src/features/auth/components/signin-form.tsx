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
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import OAuthButtons from "./oauth-buttons";
import Link from "next/link";
import { resetPasswordPath } from "@/path";

interface SignInFormProps {
  onSwitchView: () => void;
  setIsOpen: (open: boolean) => void;
}

function SignInForm({ onSwitchView, setIsOpen }: SignInFormProps) {
  const router = useRouter();

  const { execute, isPending, hasSucceeded } = useAction(signIn, {
    onSuccess: () => {
      router.refresh();

      setTimeout(() => {
        router.push("/");
      }, 100);
      setIsOpen(false);
    },
    onError: ({ error }) => {
      const message = error.serverError || "Something went wrong!";
      toast.error(message);
    },
  });

  const form = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: signInSchemaType) {
    execute(data);
  }

  useEffect(() => {
    if (hasSucceeded) {
      router.push("/");
    }
  }, [hasSucceeded, router]);

  return (
    <CardWrapper
      title="Sign In"
      description="Sign in to your account."
      footer={
        <div className="w-full flex items-center justify-between text-sm text-muted-foreground font-medium">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchView}
              className="underline hover:text-primary transition-colors"
            >
              Sign up
            </button>
          </p>
          <div onClick={() => setIsOpen(false)}>
            <Link
              href={resetPasswordPath}
              className="underline hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      }
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
        <SubmitButton label="Sign In" isPending={isPending} />
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

export default SignInForm;
