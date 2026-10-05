import type { Metadata } from "next";
import Link from "next/link";
import ContinueWithGoogle from "@/components/auth/social/google";
import SignupForm from "@/components/forms/auth/signup.form";
import Logo from "@/components/logo/logo";
import { Heading4 } from "@/components/typography/typography";
import { APP_NAME } from "@/constraints";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldSeparator } from "@/components/ui/field";

export const metadata: Metadata = {
  title: "Create an Account",
  description: `Create your ${APP_NAME} account to donate blood, request blood, manage your availability, and help people in need.`,
};

export default function SignupPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full max-w-md'>
      <div className='flex flex-col items-center gap-2'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Create your {APP_NAME} account
        </Heading4>
      </div>

      <CardHeader>
        <CardTitle className='text-xl'>Join the {APP_NAME} community</CardTitle>

        <CardDescription className='pb-1'>
          Create an account to donate blood, request blood, manage your
          availability, and help people in need.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <SignupForm />

        <p className='pt-2 text-muted-foreground text-sm text-center'>
          Already have an account?
          <Link
            href='/signin'
            className='ml-1 font-medium text-brand hover:underline'
          >
            Sign in
          </Link>
        </p>

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
