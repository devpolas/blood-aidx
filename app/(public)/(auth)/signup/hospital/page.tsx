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
  title: "Register Your Hospital",
  description: `Create your ${APP_NAME} hospital account to manage blood needs and connect with blood donors.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg py-6 border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Register Your Hospital
        </Heading4>
      </div>

      <CardHeader>
        <CardTitle className='text-xl'>Connect your hospital</CardTitle>

        <CardDescription>
          Create a hospital account to manage blood needs, respond to requests,
          and connect with available donors.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm role='hospital' />

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
