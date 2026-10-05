"use client";

import type { SignUpFormValues } from "@/validators/auth.validator";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { GENDERS } from "@/config";
import { useSignup } from "@/hooks/auth";
import { SignUpSchema } from "@/validators/auth.validator";
import { FormInput } from "../components/form.input";
import { FormRadioGroup } from "../components/form.radio.group";
import { Button } from "../../ui/button";
import { toast } from "../../ui/toast";
import { LoadingSpinner } from "../../shared/loading/loading";
import { useIsMobile } from "@/hooks/use-mobile";

const DEFAULT_VALUES: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  gender: undefined,
  role: "user",
};

export default function SignupForm() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { mutateAsync: signup, isPending: isSignup } = useSignup();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,

    validators: {
      onSubmit: SignUpSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        const response = await signup({
          name: value.name,
          email: value.email,
          password: value.password,
          gender: value.gender,
          role: value.role,
        });

        if (!response.success) {
          toast.add({
            title: "Signup failed",
            description:
              response.message ||
              "Unable to create your account. Please try again.",
            type: "error",
          });

          return;
        }

        // Clear the form immediately after successful signup.
        form.reset();

        toast.add({
          title: "Account created",
          description: "Please verify your email address to continue.",
          type: "success",
        });

        const params = new URLSearchParams({
          email: value.email,
        });

        router.replace(`/verify-account?${params.toString()}`);
      } catch (error) {
        toast.add({
          title: "Signup failed",
          description:
            error instanceof Error
              ? error.message
              : "Unable to create your account. Please try again.",
          type: "error",
        });
      }
    },
  });

  return (
    <form
      aria-busy={isSignup}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <div className='flex flex-col gap-3'>
        <form.Field name='name'>
          {(field) => (
            <FormInput
              id='name'
              type='text'
              field={field}
              label='Full Name'
              placeholder='Enter your full name'
              isRequired
              disabled={isSignup}
              autoComplete='name'
            />
          )}
        </form.Field>

        <form.Field name='email'>
          {(field) => (
            <FormInput
              id='email'
              type='email'
              field={field}
              label='Email Address'
              placeholder='Enter your email address'
              isRequired
              disabled={isSignup}
              autoComplete='email'
            />
          )}
        </form.Field>

        <form.Field name='password'>
          {(field) => (
            <FormInput
              id='password'
              type='password'
              field={field}
              label='Password'
              placeholder='Create a password'
              isRequired
              disabled={isSignup}
              autoComplete='new-password'
            />
          )}
        </form.Field>

        <form.Field name='gender'>
          {(field) => (
            <FormRadioGroup
              label='Gender'
              field={field}
              options={GENDERS}
              isRequired
              orientation={isMobile ? "vertical" : "horizontal"}
              disabled={isSignup}
            />
          )}
        </form.Field>

        <Button
          type='submit'
          disabled={isSignup}
          className='hover:bg-brand-foreground mt-2 font-medium text-brand hover:cursor-pointer glass-brand'
        >
          {isSignup ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Creating account'
              shimmer
            />
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  );
}
