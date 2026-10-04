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
  title: "Find Blood Support",
  description: `Create your ${APP_NAME} recipient account to request blood and connect with suitable donors.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Find Blood Support
        </Heading4>
      </div>

      <CardHeader>
        <CardTitle className='text-xl'>Create your recipient account</CardTitle>

        <CardDescription>
          Create an account to request blood, find compatible donors, and get
          the support you need when it matters most.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm role='recipient' />

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
