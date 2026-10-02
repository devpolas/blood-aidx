import type { Metadata } from "next";
import Link from "next/link";

import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";
import { APP_NAME } from "@/constraints";
import SignupForm from "@/components/forms/auth/signup.form";
import ContinueWithGoogle from "@/components/auth/social/google";

export const metadata: Metadata = {
  title: "Create Account",
  description: `Create your Blood ${APP_NAME} to find blood donors, respond to requests, and help save lives.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg py-6 border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Create your {APP_NAME} account
        </Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Get started</CardTitle>

        <CardDescription>
          Create an account to find blood donors, respond to requests, and make
          a difference.
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-4 pt-2'>
        {/* Signup form */}
        <SignupForm role='donor' />

        <p className='text-muted-foreground text-sm text-center'>
          Already have an account?
          <Link
            href='/signin'
            className='m-1 font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>

        <FieldSeparator className='bg-transparent *:data-[slot=field-separator-content]:bg-card'>
          Or continue with
        </FieldSeparator>

        <div className='pt-2'>
          <ContinueWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
