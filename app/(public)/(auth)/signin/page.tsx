import Link from "next/link";
import type { Metadata } from "next";

import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FieldSeparator } from "@/components/ui/field";
import { APP_NAME } from "@/constraints";
import SigninForm from "@/components/forms/auth/signin.form";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to your ${APP_NAME} account to find donors, respond to blood requests, and help save lives.`,
};

export default function SigninPage() {
  return (
    <Card className='shadow-lg py-6 border-border/60 w-full max-w-md'>
      <div className='flex flex-col items-center gap-4'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Welcome Back to <span className='text-brand'>{APP_NAME}</span>
        </Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Sign in to your account</CardTitle>

        <CardDescription>
          Enter your email and password to continue with{" "}
          <span className='text-brand'>{APP_NAME}</span>
        </CardDescription>

        <CardAction>
          <Link
            href='/signup'
            className='text-brand hover:text-brand-primary text-sm hover:underline transition-colors'
          >
            Create a new account
          </Link>
        </CardAction>
      </CardHeader>

      {/* Form */}
      <CardContent className='space-y-4'>
        <SigninForm />

        {/* Social Login */}
        <FieldSeparator className='bg-transparent *:data-[slot=field-separator-content]:bg-card'>
          Or continue with
        </FieldSeparator>

        <div className='pt-4'>{/* google signin button   */}</div>
      </CardContent>
    </Card>
  );
}
