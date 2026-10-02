"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import ResetPasswordForm from "@/components/forms/reset-password.form";

export default function ResetPasswordContent() {
  const searchParams = useSearchParams();

  const resetToken = searchParams.get("token") ?? "";

  return (
    <Card className='shadow-lg py-6 border-border/60 w-full max-w-md'>
      <div className='flex flex-col items-center gap-4 px-6'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Create a new {APP_NAME} password
        </Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Create new password</CardTitle>

        <CardDescription>
          Choose a strong new password for your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {resetToken ? (
          <ResetPasswordForm resetToken={resetToken} />
        ) : (
          <div className='space-y-4 text-center'>
            <p className='text-muted-foreground text-sm'>
              This password reset session is missing or invalid.
            </p>

            <Link
              href='/forgot-password'
              className='font-medium text-brand hover:underline'
            >
              Request a new reset code
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
