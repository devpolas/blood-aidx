"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

import Logo from "@/components/logo/logo";
import { Heading3, Muted } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blood AidX Error Boundary:", error);
  }, [error]);

  return (
    <div className='flex justify-center items-center px-4 min-h-[70vh]'>
      <Card className='shadow-xl border-border/60 w-full max-w-lg'>
        <CardHeader className='flex flex-col justify-center items-center space-y-5 text-center'>
          <Logo />

          <div className='flex justify-center items-center bg-destructive/10 rounded-full size-14'>
            <AlertTriangle className='size-7 text-destructive' />
          </div>

          <div className='space-y-2'>
            <Heading3>Something went wrong</Heading3>

            <Muted>
              We couldn&apos;t complete your request right now. Please try again
              or return to the Blood AidX home page.
            </Muted>
          </div>
        </CardHeader>

        <CardContent>
          {process.env.NODE_ENV === "development" && (
            <div className='bg-destructive/5 p-3 border border-destructive/30 rounded-md text-destructive text-sm text-center'>
              {error.message}
            </div>
          )}
        </CardContent>

        <CardFooter className='flex sm:flex-row flex-col gap-3'>
          <Button onClick={reset} className='w-full'>
            <RefreshCcw className='mr-2 size-4' />
            Try Again
          </Button>

          <Button
            variant='outline'
            className='w-full'
            render={
              <Link href='/'>
                <Home className='mr-2 size-4' />
                Return Home
              </Link>
            }
          ></Button>
        </CardFooter>
      </Card>
    </div>
  );
}
