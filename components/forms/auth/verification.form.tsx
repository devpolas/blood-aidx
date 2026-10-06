"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useResendVerification, useVerifyEmail } from "@/hooks/auth";
import { useResendCooldown } from "@/hooks/use.resend.cooldown";
import {
  VerifyEmailSchema,
  type VerifyEmailInput,
} from "@/validators/auth.validator";
import { Time } from "@/utils/time.helper";
import { Button } from "../../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../ui/input-otp";
import { toast } from "../../ui/toast";
import { LoadingSpinner } from "../../shared/loading/loading";
import { FieldSeparator } from "../../ui/field";

type VerifyAccountFormProps = {
  email?: string;
};

const RESEND_COOLDOWN = Time.minute(2);
const RESEND_STORAGE_KEY = "blood-aidx:verification-resend";

const DEFAULT_VALUES: VerifyEmailInput = {
  email: "",
  code: "",
};

export default function VerifyAccountForm({
  email = "",
}: VerifyAccountFormProps) {
  const router = useRouter();

  const { mutateAsync: verifyEmail, isPending: isVerifying } = useVerifyEmail();

  const { mutateAsync: resendVerification, isPending: isResending } =
    useResendVerification();

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
      onSubmit: VerifyEmailSchema,
    },

    onSubmit: async ({ value }) => {
      await verifyEmail(value, {
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

          form.reset();

          toast.add({
            title: "Account verified",
            description: "Your account has been verified successfully.",
            type: "success",
          });

          // Keep the callback URL in localStorage.
          // Signin will read it and redirect the user after authentication.
          router.replace("/signin");
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

    await resendVerification(
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
            description: "A new verification code has been sent to your email.",
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
                  <p className='font-medium text-lg'>Verification code</p>

                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    Enter the 6-digit code sent to your email.
                  </p>
                </div>

                <InputOTP
                  id='verification-code'
                  maxLength={6}
                  value={field.state.value}
                  onChange={handleCodeChange}
                  onBlur={field.handleBlur}
                  disabled={isFormBusy}
                  inputMode='numeric'
                  pattern='[0-9]*'
                  containerClassName='w-full justify-center'
                  aria-label='6-digit verification code'
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? "verification-code-error" : undefined
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
                    id='verification-code-error'
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
            "Verify account"
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
