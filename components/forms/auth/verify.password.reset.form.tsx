"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { useForgotPassword, useVerifyPasswordReset } from "@/hooks";
import { useResendCooldown } from "@/hooks";

import {
  VerifyPasswordResetSchema,
  type VerifyPasswordResetInput,
} from "@/validators/auth.validator";

import { Time } from "@/utils/time.helper";

import { Button } from "../../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { toast } from "../../ui/toast";
import { LoadingSpinner } from "../../shared/loading/loading";
import { FieldSeparator } from "../../ui/field";

type VerifyPasswordResetFormProps = {
  email?: string;
};

const RESEND_COOLDOWN = Time.minute(2);
const RESEND_STORAGE_KEY = "blood-aidx:password-reset-resend";

const DEFAULT_VALUES: VerifyPasswordResetInput = {
  email: "",
  code: "",
};

export default function VerifyPasswordResetForm({
  email = "",
}: VerifyPasswordResetFormProps) {
  const router = useRouter();

  const { mutateAsync: verifyPasswordReset, isPending: isVerifying } =
    useVerifyPasswordReset();

  const { mutateAsync: forgotPassword, isPending: isResending } =
    useForgotPassword();

  const { remainingTime, formattedTime, isCoolingDown, startCooldown } =
    useResendCooldown({
      email,
      storageKey: RESEND_STORAGE_KEY,
      duration: RESEND_COOLDOWN,
    });

  const form = useForm({
    defaultValues: {
      ...DEFAULT_VALUES,
      email,
    },

    validators: {
      onSubmit: VerifyPasswordResetSchema,
    },

    onSubmit: async ({ value }) => {
      await verifyPasswordReset(value, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Verification failed",
              description:
                res.message || "The verification code is invalid or expired.",
              type: "error",
            });

            return;
          }

          const resetToken = res.data?.resetToken;

          if (!resetToken) {
            toast.add({
              title: "Verification failed",
              description:
                "The reset permission was not returned. Please try again.",
              type: "error",
            });

            return;
          }

          // Clear the form immediately after successful signup.
          form.reset();

          toast.add({
            title: "Code verified",
            description:
              "Your identity has been verified. You can now create a new password.",
            type: "success",
          });

          router.replace(
            `/reset-password?token=${encodeURIComponent(resetToken)}`,
          );
        },

        onError: (error) => {
          toast.add({
            title: "Verification failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  const handleCodeChange = (code: string) => {
    form.setFieldValue("code", code);

    if (code.length === 6 && !isVerifying && !isResending) {
      void form.handleSubmit();
    }
  };

  const handleResend = async () => {
    if (!email || isCoolingDown || isResending || isVerifying) {
      return;
    }

    await forgotPassword(
      { email },
      {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Resend failed",
              description:
                res.message || "Something went wrong. Please try again.",
              type: "error",
            });

            return;
          }

          form.setFieldValue("code", "");
          startCooldown();

          toast.add({
            title: "Code sent",
            description:
              "A new password reset code has been sent to your email.",
            type: "success",
          });
        },

        onError: (error) => {
          toast.add({
            title: "Resend failed",
            description:
              error.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const isFormBusy = isVerifying || isResending;
  const isResendDisabled = !email || isFormBusy || isCoolingDown;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className='flex flex-col gap-6'>
        <form.Field name='code'>
          {(field) => {
            const error = field.state.meta.errors[0]?.message;

            return (
              <div className='flex flex-col items-center gap-4'>
                <div className='space-y-1.5 w-full text-center'>
                  <p className='font-medium text-lg'>Password reset code</p>

                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    Enter the 6-digit code sent to your email.
                  </p>
                </div>

                <InputOTP
                  id='password-reset-code'
                  maxLength={6}
                  value={field.state.value}
                  onChange={handleCodeChange}
                  onBlur={field.handleBlur}
                  disabled={isFormBusy}
                  inputMode='numeric'
                  pattern='[0-9]*'
                  containerClassName='w-full justify-center'
                  aria-label='6-digit password reset code'
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? "password-reset-code-error" : undefined
                  }
                >
                  <InputOTPGroup className='w-full max-w-sm'>
                    {Array.from({ length: 6 }, (_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className='flex-1 min-w-0'
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {error ? (
                  <p
                    id='password-reset-code-error'
                    className='text-destructive text-sm text-center'
                  >
                    {error}
                  </p>
                ) : (
                  <p className='text-muted-foreground text-xs text-center'>
                    The code expires after a limited time.
                  </p>
                )}
              </div>
            );
          }}
        </form.Field>

        <Button
          type='submit'
          disabled={isFormBusy}
          className='hover:bg-brand-foreground w-full font-medium text-brand hover:cursor-pointer glass-brand'
        >
          {isVerifying ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Verifying'
              shimmer
            />
          ) : (
            "Verify code"
          )}
        </Button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='border-border/60 border-t w-full' />
          </div>

          <FieldSeparator className='bg-transparent *:data-[slot=field-separator-content]:bg-card'>
            Didn&apos;t receive the code?
          </FieldSeparator>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <Button
            type='button'
            variant='link'
            disabled={isResendDisabled}
            onClick={() => void handleResend()}
            className='p-0 h-auto font-medium text-brand hover:cursor-pointer'
          >
            {isResending ? (
              <span className='inline-flex items-center gap-2'>
                <LoadingSpinner spinnerClassName='size-3.5 text-brand' />
                Sending new code...
              </span>
            ) : isCoolingDown ? (
              `Resend code in ${formattedTime}`
            ) : (
              "Resend code"
            )}
          </Button>

          {remainingTime > 0 && (
            <p className='text-muted-foreground text-xs text-center'>
              You can request another code when the timer reaches zero.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
