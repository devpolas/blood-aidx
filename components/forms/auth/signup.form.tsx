"use client";
import {
  SignUpFormValues,
  SignUpInput,
  SignUpSchema,
} from "@/validators/auth.validator";
import { useForm } from "@tanstack/react-form";
import { FormInput } from "../components/form.input";
import { FormRadioGroup } from "../components/form.radio.group";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../../ui/button";
import { LoadingSpinner } from "../../shared/loading/loading";
import { useSignup } from "@/hooks/auth";
import { toast } from "../../ui/toast";
import { useRouter } from "next/navigation";

const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const DEFAULT_VALUES: SignUpFormValues = {
  name: "",
  email: "",
  password: "",
  gender: undefined,
  role: "donor",
};

export default function SignupForm({ role }: { role: SignUpInput["role"] }) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { mutateAsync: signup, isPending: isSignup } = useSignup();
  const form = useForm({
    defaultValues: { ...DEFAULT_VALUES, role },
    validators: {
      onSubmit: SignUpSchema,
    },

    onSubmit: ({ value }) => {
      const signupData = {
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
        gender: value.gender!,
      };
      signup(signupData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Signup Failed",
              description:
                res.message || "Something went wrong. Please try again",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Signup Successful",
            description: "Please verify your account",
            type: "success",
          });

          const params = new URLSearchParams({ email: value.email });
          router.push(`/verify-account?${params.toString()}`);
        },

        onError: (err) => {
          toast.add({
            title: "Signup Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className='flex flex-col gap-5'>
        <form.Field name='name'>
          {(field) => (
            <FormInput
              label='Full Name'
              field={field}
              id='name'
              isRequired
              type='text'
              placeholder='Enter Your Full Name'
              disabled={isSignup}
            />
          )}
        </form.Field>

        <form.Field name='email'>
          {(field) => (
            <FormInput
              label='Email'
              field={field}
              id='email'
              isRequired
              type='email'
              placeholder='Enter Your Email Address'
              disabled={isSignup}
            />
          )}
        </form.Field>

        <form.Field name='password'>
          {(field) => (
            <FormInput
              label='Password'
              field={field}
              id='password'
              isRequired
              type='password'
              placeholder='Enter Your Password'
              disabled={isSignup}
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
          className={
            "glass-brand text-brand font-medium hover:cursor-pointer hover:bg-brand-foreground"
          }
        >
          {isSignup ? (
            <LoadingSpinner
              spinnerClassName='text-brand'
              textClassName='text-brand'
              text='Signing up'
              shimmer
            />
          ) : (
            "Signup"
          )}
        </Button>
      </div>
    </form>
  );
}
