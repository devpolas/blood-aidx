"use client";

import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/shared/loading/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heading2, Muted } from "@/components/typography/typography";
import {
  useAuth,
  useBloodRequest,
  useCancelBloodRequest,
  useCreateBloodRequestResponse,
} from "@/hooks";
import { BloodRequestDetails } from "@/modules/blood-request/components/blood-request-details";

import { BloodRequestDetailsSkeleton } from "./blood-request-details-skeleton";

interface BloodRequestDetailsPageProps {
  id: string;
}

export function BloodRequestDetailsPage({ id }: BloodRequestDetailsPageProps) {
  const router = useRouter();

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showResponseDialog, setShowResponseDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);

  const { data, isPending, isError, refetch } = useBloodRequest(id);
  const { user, isLoading } = useAuth();

  const { mutateAsync: cancelRequest, isPending: isCancelPending } =
    useCancelBloodRequest();

  const {
    mutateAsync: createResponse,
    isPending: isResponsePending,
    error: responseError,
  } = useCreateBloodRequestResponse();

  const request = data?.data?.request;

  // Cancel Blood Request
  const handleCancel = async () => {
    if (!request || isCancelPending) return;

    setCancelError(null);

    try {
      await cancelRequest(request.id);
      setShowCancelDialog(false);
      router.push("/find-requests");
    } catch (error) {
      setCancelError(
        error instanceof Error
          ? error.message
          : "Unable to cancel this blood request. Please try again.",
      );
    }
  };

  // Respond to Blood Request
  const handleResponseSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!request || isResponsePending) return;

    try {
      await createResponse({
        requestId: request.id,
        payload: {
          message: message.trim() || undefined,
        },
      });

      setMessage("");
      setShowResponseDialog(false);
    } catch {
      // The mutation error is displayed in the response dialog.
    }
  };

  if (isPending || isLoading) {
    return (
      <section className='mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full'>
        <BloodRequestDetailsSkeleton />
      </section>
    );
  }

  if (isError || !request) {
    return (
      <section className='mx-auto px-4 sm:px-6 py-8 w-full'>
        <Heading2>Blood request not found</Heading2>

        <Muted className='mt-2'>
          This request may have been removed or is temporarily unavailable.
        </Muted>

        <div className='flex flex-wrap gap-3 mt-5'>
          <Button
            type='button'
            variant='outline'
            onClick={() => void refetch()}
          >
            Try again
          </Button>

          <Button>
            <Link href='/find-requests'>All blood requests</Link>
          </Button>
        </div>
      </section>
    );
  }

  const showManageActions = request.requesterId === user?.id;

  return (
    <section className='flex flex-col gap-5 sm:gap-6 mx-auto py-4 w-full'>
      <BloodRequestDetails
        request={request}
        showManageActions={showManageActions}
        onEdit={() => router.push(`/find-requests/${request.id}/edit`)}
        onCancel={() => {
          setCancelError(null);
          setShowCancelDialog(true);
        }}
        isCancelPending={isCancelPending}
        onRespond={() => setShowResponseDialog(true)}
      />

      {/* Cancel Blood Request Dialog */}
      <Dialog
        open={showCancelDialog}
        onOpenChange={(open) => {
          if (!isCancelPending) {
            setShowCancelDialog(open);

            if (open) {
              setCancelError(null);
            }
          }
        }}
      >
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Cancel blood request?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this blood request? This action
              may affect donors who are preparing to respond.
            </DialogDescription>
          </DialogHeader>

          {cancelError && (
            <p role='alert' className='text-destructive text-sm'>
              {cancelError}
            </p>
          )}

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              disabled={isCancelPending}
              onClick={() => setShowCancelDialog(false)}
            >
              Keep request
            </Button>

            <Button
              type='button'
              variant='destructive'
              disabled={isCancelPending}
              onClick={() => void handleCancel()}
            >
              {isCancelPending ? (
                <LoadingSpinner
                  text='Cancelling request...'
                  spinnerClassName='text-current'
                  textClassName='text-current'
                />
              ) : (
                "Cancel request"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Respond to Blood Request Dialog */}
      <Dialog
        open={showResponseDialog && !showManageActions}
        onOpenChange={(open) => {
          if (!isResponsePending) {
            setShowResponseDialog(open);

            if (!open) {
              setMessage("");
            }
          }
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>Respond to blood request</DialogTitle>
            <DialogDescription>
              Let the requester know you are interested in donating. Add an
              optional message about your availability.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleResponseSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label htmlFor='response-message' className='font-medium text-sm'>
                Message{" "}
                <span className='text-muted-foreground'>(optional)</span>
              </label>

              <textarea
                id='response-message'
                name='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder='Share your availability or any helpful details...'
                maxLength={1000}
                rows={4}
                disabled={isResponsePending}
                className='bg-background disabled:opacity-50 px-3 py-2 border border-input focus-visible:border-ring rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/50 w-full placeholder:text-muted-foreground text-sm resize-y disabled:cursor-not-allowed'
              />

              <Muted>{message.length}/1000 characters</Muted>
            </div>

            {responseError && (
              <p role='alert' className='text-destructive text-sm'>
                {responseError instanceof Error
                  ? responseError.message
                  : "Unable to submit your response. Please try again."}
              </p>
            )}

            <DialogFooter>
              <Button
                type='button'
                variant='outline'
                disabled={isResponsePending}
                onClick={() => {
                  setShowResponseDialog(false);
                  setMessage("");
                }}
              >
                Cancel
              </Button>

              <Button type='submit' disabled={isResponsePending}>
                {isResponsePending ? (
                  <LoadingSpinner
                    text='Submitting response...'
                    spinnerClassName='text-current'
                    textClassName='text-current'
                  />
                ) : (
                  "Submit response"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
