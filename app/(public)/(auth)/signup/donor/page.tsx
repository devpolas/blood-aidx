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
  title: "Become a Blood Donor",
  description: `Create your ${APP_NAME} donor account and help save lives by donating blood to people in need.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Become a Blood Donor
        </Heading4>
      </div>

      <CardHeader>
        <CardTitle className='text-xl'>Join the donor community</CardTitle>

        <CardDescription>
          Create your donor account to share your availability, respond to blood
          requests, and help save lives.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm role='donor' />

        <p className='text-muted-foreground text-sm text-center'>
          Already have an account?
          <Link
            href='/signin'
            className='font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>

        <FieldSeparator className='bg-transparent *:data-[slot=field-separator-content]:bg-card'>
          Or continue with
        </FieldSeparator>

        <div>
          <ContinueWithGoogle />
        </div>
      </CardContent>
    </Card>
  );
}
