"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useForgotPassword } from "@/hooks/auth";
import {
  ForgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/validators/auth.validator";
import { toast } from "@/components/ui/toast";
import { FormInput } from "../components/form.input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/shared/loading/loading";

const DEFAULT_VALUES: ForgotPasswordInput = {
  email: "",
};

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const form = useForm({
    defaultValues: DEFAULT_VALUES,

    validators: {
      onSubmit: ForgotPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      await forgotPassword(value, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Request failed",
              description:
                res.message ||
                "We couldn't process your password reset request.",
              type: "error",
            });

            return;
          }

          // Clear the form immediately after successful signup.
          form.reset();

          toast.add({
            title: "Code sent",
            description:
              res.message ??
              "A password reset code has been sent to your email.",
            type: "success",
          });

          const email = encodeURIComponent(value.email.trim().toLowerCase());
          router.replace(`/verify-password-reset?email=${email}`);
        },

        onError: (error) => {
          toast.add({
            title: "Request failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <div className='flex flex-col gap-6'>
        <form.Field name='email'>
          {(field) => {
            return (
              <FormInput
                field={field}
                label='Email Address'
                id='forgot-password-email'
                type='email'
                placeholder='you@example.com'
                autoComplete='email'
                disabled={isPending}
                isRequired
              />
            );
          }}
        </form.Field>

        <Button
          type='submit'
          disabled={isPending}
          className='hover:bg-brand-foreground w-full font-medium text-brand hover:cursor-pointer glass-brand'
        >
          {isPending ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Sending code'
              shimmer
            />
          ) : (
            "Send reset code"
          )}
        </Button>

        <p className='text-muted-foreground text-sm text-center'>
          Remember your password?{" "}
          <Link
            href='/signin'
            className='font-medium text-brand hover:text-brand-primary hover:underline transition-colors'
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
