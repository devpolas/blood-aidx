import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Payment } from "@/types/payment";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";

import {
  createCoffeePaymentSchema,
  CreateCoffeePaymentInput,
  refundPaymentSchema,
  RefundPaymentInput,
} from "@/validators/payment.validator";

// Create Coffee Payment
// POST /payments/coffee

export async function createCoffeePayment(
  payload: CreateCoffeePaymentInput,
): Promise<ApiResponse<{ payment: Payment }>> {
  try {
    const parse = createCoffeePaymentSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid payment input",
      );
    }

    return await apiClient<ApiResponse<{ payment: Payment }>>(
      "/payments/coffee",
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get My Payments
// GET /payments/my

export async function getMyPayments(): Promise<
  ApiResponse<{ payments: Payment[] }>
> {
  try {
    return await apiClient<ApiResponse<{ payments: Payment[] }>>(
      "/payments/my",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Donor Payments
// GET /payments/donor/:donorId

export async function getDonorPayments(
  donorId: string,
): Promise<ApiResponse<{ payments: Payment[] }>> {
  try {
    if (!donorId.trim()) {
      return errorResponse("Donor ID is required");
    }

    return await apiClient<ApiResponse<{ payments: Payment[] }>>(
      `/payments/donor/${donorId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Payment
// GET /payments/:paymentId

export async function getPayment(
  paymentId: string,
): Promise<ApiResponse<{ payment: Payment }>> {
  try {
    if (!paymentId.trim()) {
      return errorResponse("Payment ID is required");
    }

    return await apiClient<ApiResponse<{ payment: Payment }>>(
      `/payments/${paymentId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Payment For Admin
// GET /payments/admin/:paymentId

export async function getPaymentForAdmin(
  paymentId: string,
): Promise<ApiResponse<{ payment: Payment }>> {
  try {
    if (!paymentId.trim()) {
      return errorResponse("Payment ID is required");
    }

    return await apiClient<ApiResponse<{ payment: Payment }>>(
      `/payments/admin/${paymentId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Refund Payment
// POST /payments/admin/:paymentId/refund

export async function refundPayment(
  paymentId: string,
  payload: RefundPaymentInput,
): Promise<ApiResponse<{ payment: Payment }>> {
  try {
    if (!paymentId.trim()) {
      return errorResponse("Payment ID is required");
    }

    const parse = refundPaymentSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid refund input",
      );
    }

    return await apiClient<ApiResponse<{ payment: Payment }>>(
      `/payments/admin/${paymentId}/refund`,
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
