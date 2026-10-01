"use client";
import { SignUpInput, SignUpSchema } from "@/validators/auth.validator";
import { useForm } from "@tanstack/react-form";
import { FormInput } from "./components/form.input";
import { FormRadioGroup } from "./components/form.radio.group";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import { LoadingSpinner } from "../shared/loading/loading";

const GENDERS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const DEFAULT_VALUES: SignUpInput = {
  name: "",
  email: "",
  password: "",
  gender: undefined,
  role: "donor",
};

export default function SignupForm({ role }: { role: SignUpInput["role"] }) {
  const isMobile = useIsMobile();
  const form = useForm({
    defaultValues: { ...DEFAULT_VALUES, role },
    validators: {
      onSubmit: SignUpSchema,
    },

    onSubmit: ({ value }) => {
      console.log(value);
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
              type='text'
              placeholder='Enter Your Full Name'
            />
          )}
        </form.Field>

        <form.Field name='email'>
          {(field) => (
            <FormInput
              label='Email'
              field={field}
              id='email'
              type='email'
              placeholder='Enter Your Email Address'
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
              placeholder='Enter Your Password'
            />
          )}
        </form.Field>

        <form.Field name='gender'>
          {(field) => (
            <FormRadioGroup
              label='Gender'
              field={field}
              options={GENDERS}
              orientation={isMobile ? "vertical" : "horizontal"}
            />
          )}
        </form.Field>
        <Button
          type='submit'
          className={
            "glass-brand text-brand font-medium hover:cursor-pointer hover:bg-brand-foreground"
          }
        >
          Signup
          {/* <LoadingSpinner
            spinnerClassName='text-brand'
            textClassName='text-brand'
            text='Signup'
            shimmer
          /> */}
        </Button>
      </div>
    </form>
  );
}
