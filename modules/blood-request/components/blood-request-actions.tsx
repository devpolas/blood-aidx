"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Eye, Pencil, Send, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import type { BloodRequest } from "@/types/blood.request";

interface BloodRequestActionsProps {
  request: BloodRequest;
  onRespond?: (request: BloodRequest) => void;
  onEdit?: (request: BloodRequest) => void;
  onCancel?: (request: BloodRequest) => void;
  showManageActions?: boolean;
  showDetailsButton?: boolean;
}

export function BloodRequestActions({
  request,
  onRespond,
  onEdit,
  onCancel,
  showManageActions = false,
  showDetailsButton = true,
}: BloodRequestActionsProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const detailsPath = `/find-requests/${request.id}`;

  function handleRespond() {
    if (!isAuthenticated) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(detailsPath)}`);
      return;
    }

    if (onRespond) {
      onRespond(request);
      return;
    }

    router.push(detailsPath);
  }

  const hasManagementActions = showManageActions && Boolean(onEdit || onCancel);

  return (
    <div className='flex flex-col gap-3 min-w-0'>
      {/* Primary actions */}
      <div className='sm:flex sm:flex-wrap sm:items-center gap-2 grid grid-cols-1'>
        {showDetailsButton && (
          <Button
            type='button'
            variant='outline'
            className='sm:flex-1 gap-2 w-full sm:w-auto'
            onClick={() => router.push(detailsPath)}
          >
            <Eye className='size-4 shrink-0' />
            <span>View details</span>
          </Button>
        )}

        <Button
          type='button'
          className='sm:flex-1 gap-2 w-full sm:w-auto'
          onClick={handleRespond}
        >
          <Send className='size-4 shrink-0' />
          <span>Respond to request</span>
          <ArrowRight className='ml-auto sm:ml-0 size-4 shrink-0' />
        </Button>
      </div>

      {/* Request management */}
      {hasManagementActions && (
        <div className='flex sm:flex-row flex-col sm:flex-wrap sm:items-center gap-2 pt-3 border-border/60 border-t min-w-0'>
          {onEdit && (
            <Button
              type='button'
              variant='outline'
              className='gap-2 w-full sm:w-auto'
              onClick={() => onEdit(request)}
            >
              <Pencil className='size-4 shrink-0' />
              Edit request
            </Button>
          )}

          {onCancel && (
            <Button
              type='button'
              variant='destructive'
              className='gap-2 sm:ml-auto w-full sm:w-auto'
              onClick={() => onCancel(request)}
            >
              <XCircle className='size-4 shrink-0' />
              Cancel request
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
