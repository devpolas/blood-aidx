"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Logo from "@/components/logo/logo";
import VerifyAccountForm from "@/components/forms/auth/verification.form";
import { Heading4 } from "@/components/typography/typography";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/constraints";

export default function VerifyAccountContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  return (
    <Card className='shadow-lg py-6 border-border/60 w-full max-w-md'>
      <div className='flex flex-col items-center gap-4 px-6'>
        <Logo />

        <Heading4 className='text-brand text-center'>
          Verify your {APP_NAME} account
        </Heading4>
      </div>

      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl'>Verify your account</CardTitle>

        <CardDescription>
          Enter the 6-digit verification code sent to{" "}
          {email ? (
            <span className='font-medium text-foreground'>{email}</span>
          ) : (
            "your email"
          )}
          .
        </CardDescription>

        <CardAction>
          <Link
            href='/signin'
            className='text-brand hover:text-brand-primary text-sm hover:underline transition-colors'
          >
            Back to sign in
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent className='pt-2'>
        <VerifyAccountForm email={email || undefined} />
      </CardContent>
    </Card>
  );
}
