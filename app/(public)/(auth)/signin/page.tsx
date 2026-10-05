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
import ContinueWithGoogle from "@/components/auth/social/google";

export const metadata: Metadata = {
  title: "Sign In",
  description: `Sign in to your ${APP_NAME} account to find donors, respond to blood requests, and help save lives.`,
};

export default function SigninPage() {
  return (
    <Card className='shadow-lg border-border/60 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Welcome Back to <span className='text-brand'>{APP_NAME}</span>
        </Heading4>
      </div>

      <CardHeader>
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

      <CardContent>
        <SigninForm />

        <div className='pt-2'>
          <FieldSeparator className='bg-transparent *:data-[slot=field-separator-content]:bg-card'>
            Or continue with
          </FieldSeparator>
        </div>

        <div className='pt-2'>
          <ContinueWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
