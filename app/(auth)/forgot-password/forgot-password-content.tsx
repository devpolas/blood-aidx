"use client";
import ForgotPasswordForm from "@/components/forms/auth/forgot.password.form";
import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_NAME } from "@/constraints";

export default function ForgotPasswordContent() {
  return (
    <Card className='shadow-lg py-6 border-border/60 w-full max-w-md'>
      <div className='flex flex-col items-center gap-4 px-6'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Reset your {APP_NAME} password
        </Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Forgot password?</CardTitle>

        <CardDescription>
          Enter the email address associated with your account. We&apos;ll send
          you a 6-digit verification code.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}
