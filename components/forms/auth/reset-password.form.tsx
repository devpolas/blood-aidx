"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useResetPassword } from "@/hooks/auth";
import { ResetPasswordSchema } from "@/validators/auth.validator";
import { Button } from "../../ui/button";
import { LoadingSpinner } from "../../shared/loading/loading";
import { toast } from "../../ui/toast";
import { FormInput } from "../components/form.input";
type ResetPasswordFormProps = {
  resetToken: string;
};

export default function ResetPasswordForm({
  resetToken,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const form = useForm({
    defaultValues: {
      resetToken,
      password: "",
      confirmPassword: "",
    },

    validators: {
      onSubmit: ResetPasswordSchema,
    },

    onSubmit: async ({ value }) => {
      await resetPassword(value, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Password reset failed",
              description: res.message || "We couldn't reset your password.",
              type: "error",
            });

            return;
          }

          // Clear the form immediately after successful signup.
          form.reset();

          toast.add({
            title: "Password changed",
            description:
              "Your password has been changed successfully. Please sign in with your new password.",
            type: "success",
          });

          router.replace("/signin");
        },

        onError: (error) => {
          toast.add({
            title: "Password reset failed",
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
      <div className='flex flex-col gap-5'>
        <form.Field name='password'>
          {(field) => {
            return (
              <FormInput
                field={field}
                label='New password'
                id='reset-password'
                type='password'
                autoComplete='new-password'
                placeholder='Enter your new password'
                disabled={isPending}
                isRequired
              />
            );
          }}
        </form.Field>

        <form.Field name='confirmPassword'>
          {(field) => {
            return (
              <FormInput
                field={field}
                label='Confirm new password'
                id='reset-confirm-password'
                type='password'
                autoComplete='new-password'
                placeholder='Confirm your new password'
                disabled={isPending}
                isRequired
              />
            );
          }}
        </form.Field>

        <p className='text-muted-foreground text-xs leading-relaxed'>
          Your new password must be at least 8 characters long.
        </p>

        <Button
          type='submit'
          disabled={isPending}
          className='hover:bg-brand-foreground w-full font-medium text-brand hover:cursor-pointer glass-brand'
        >
          {isPending ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Changing password'
              shimmer
            />
          ) : (
            "Change password"
          )}
        </Button>

        <p className='text-muted-foreground text-sm text-center'>
          Remember your password?{" "}
          <button
            type='button'
            onClick={() => router.push("/signin")}
            className='font-medium text-brand hover:underline'
          >
            Back to sign in
          </button>
        </p>
      </div>
    </form>
  );
}
