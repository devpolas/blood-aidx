"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";

import { Button } from "../../ui/button";
import { LoadingSpinner } from "../../shared/loading/loading";
import { toast } from "../../ui/toast";
import { FormInput } from "../components/form.input";

import { useSignin } from "@/hooks/auth";
import { SignInSchema, type SignInInput } from "@/validators/auth.validator";

const DEFAULT_VALUES: SignInInput = {
  email: "",
  password: "",
};

export default function SigninForm() {
  const router = useRouter();

  const { mutateAsync: signin, isPending: isSignin } = useSignin();

  const form = useForm({
    defaultValues: DEFAULT_VALUES,

    validators: {
      onSubmit: SignInSchema,
    },

    onSubmit: async ({ value }) => {
      await signin(value, {
        onSuccess: (res) => {
          if (!res.success) {
            if (res.message === "Please verify your email first") {
              const params = new URLSearchParams({
                email: value.email,
              });
              router.replace(`/verify-account?${params.toString()}`);
              return;
            }

            toast.add({
              title: "Signin Failed",
              description:
                res.message || "Something went wrong. Please try again",
              type: "error",
            });

            return;
          }

          // Clear the form immediately after successful signup.
          form.reset();

          toast.add({
            title: "Signin Successful",
            description: "Welcome to Blood AidX",
            type: "success",
          });
        },

        onError: (error) => {
          toast.add({
            title: "Signin Failed",
            description:
              error.message || "Something went wrong. Please try again",
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
      <div className='flex flex-col gap-3'>
        <form.Field name='email'>
          {(field) => (
            <FormInput
              label='Email'
              field={field}
              id='email'
              type='email'
              placeholder='Enter your email address'
              isRequired
              disabled={isSignin}
            />
          )}
        </form.Field>

        <form.Field name='password'>
          {(field) => (
            <FormInput
              label='Password'
              field={field}
              id='password'
              type='password'
              placeholder='Enter your password'
              isRequired
              isForgotPassword
              disabled={isSignin}
            />
          )}
        </form.Field>

        <Button
          type='submit'
          disabled={isSignin}
          className='hover:bg-brand-foreground mt-2 font-medium text-brand hover:cursor-pointer glass-brand'
        >
          {isSignin ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Signing in'
              shimmer
            />
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </form>
  );
}
