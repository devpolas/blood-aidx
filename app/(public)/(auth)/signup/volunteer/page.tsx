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
  title: "Join as a Volunteer",
  description: `Create your ${APP_NAME} volunteer account and help connect donors, recipients, and blood organizations.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Join as a Volunteer
        </Heading4>
      </div>

      <CardHeader>
        <CardTitle className='text-xl'>Make a difference</CardTitle>

        <CardDescription>
          Create your volunteer account to support blood donation efforts,
          connect people in need, and help your community.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm role='volunteer' />

        <p className='text-muted-foreground text-sm text-center'>
          Already have an account?
          <Link
            href='/signin'
            className='m-1 font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
