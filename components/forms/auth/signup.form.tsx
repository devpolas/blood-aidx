"use client";

import type {
  SignUpFormValues,
  SignUpInput,
} from "@/validators/auth.validator";
import { SignUpSchema } from "@/validators/auth.validator";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { FormInput } from "../components/form.input";
import { FormRadioGroup } from "../components/form.radio.group";
import { Button } from "../../ui/button";
import { LoadingSpinner } from "../../shared/loading/loading";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSignup } from "@/hooks/auth";
import { toast } from "../../ui/toast";
import { GENDERS, ROLE_CONFIG } from "@/config";

const DEFAULT_VALUES: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  gender: undefined,
  role: "donor",
};

const INDIVIDUAL_ROLES = ["donor", "recipient", "volunteer"] as const;

export default function SignupForm({ role }: { role: SignUpInput["role"] }) {
  const isMobile = useIsMobile();
  const router = useRouter();

  const { mutateAsync: signup, isPending: isSignup } = useSignup();

  const config = ROLE_CONFIG[role];

  const requiresGender = INDIVIDUAL_ROLES.includes(
    role as (typeof INDIVIDUAL_ROLES)[number],
  );

  const form = useForm({
    defaultValues: {
      ...DEFAULT_VALUES,
      role,
    },

    validators: {
      onSubmit: SignUpSchema,
    },

    onSubmit: async ({ value }) => {
      const signupData = {
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
        gender: value.gender,
      };

      try {
        const res = await signup(signupData);

        if (!res.success) {
          toast.add({
            title: "Signup Failed",
            description:
              res.message || "Something went wrong. Please try again.",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Signup Successful",
          description: "Please verify your email address to continue.",
          type: "success",
        });

        const params = new URLSearchParams({
          email: value.email,
        });

        router.push(`/verify-account?${params.toString()}`);
      } catch (error) {
        toast.add({
          title: "Signup Failed",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      }
    },
  });

  return (
    <form
      aria-busy={isSignup}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <div className='flex flex-col gap-5'>
        {/* Name */}
        <form.Field name='name'>
          {(field) => (
            <FormInput
              id='name'
              type='text'
              field={field}
              label={config.nameLabel}
              placeholder={config.namePlaceholder}
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

        {requiresGender && (
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
        )}

        <Button
          type='submit'
          disabled={isSignup}
          className='hover:bg-brand-foreground w-full font-medium text-brand hover:cursor-pointer glass-brand'
        >
          {isSignup ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Creating account'
              shimmer
            />
          ) : (
            config.submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
