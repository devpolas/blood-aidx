import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Droplets } from "lucide-react";
import Logo from "@/components/logo/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading3 } from "@/components/typography/typography";
import { APP_NAME } from "@/constraints";
import RequestBloodForm from "@/components/forms/blood/request-blood-form";

export const metadata: Metadata = {
  title: `Create Blood Request | ${APP_NAME}`,
  description:
    "Create a blood request and help connect patients with the blood they need.",
};

export default function CreateBloodRequestPage() {
  return (
    <Card className='shadow-lg border-brand/10 w-full'>
      <CardHeader>
        <div>
          <CardTitle className='flex items-center gap-2 text-xl'>
            <Droplets className='size-6 text-brand' />
            <Heading3>Create a Blood Request</Heading3>
          </CardTitle>

          <CardDescription className='pt-1'>
            Provide the blood requirement and patient information to create a
            new request.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <RequestBloodForm />
      </CardContent>
    </Card>
  );
}
