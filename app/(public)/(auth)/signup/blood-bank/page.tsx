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
import { APP_NAME } from "@/constraints";
import SignupForm from "@/components/forms/auth/signup.form";

export const metadata: Metadata = {
  title: "Register Your Blood Bank",
  description: `Create your ${APP_NAME} blood bank account to manage blood availability and connect with people in need.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Register Your Blood Bank
        </Heading4>
      </div>

      <CardHeader>
        <CardTitle className='text-xl'>Connect your blood bank</CardTitle>

        <CardDescription>
          Create a blood bank account to manage blood availability, support
          urgent requests, and connect with your community.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm role='blood_bank' />

        <p className='text-muted-foreground text-sm text-center'>
          Already have an account?
          <Link
            href='/signin'
            className='font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
