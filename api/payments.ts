import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  createCoffeePaymentSchema,
  CreateCoffeePaymentInput,
  refundPaymentSchema,
  RefundPaymentInput,
} from "@/validators/payment.validator";

export async function createCoffeePayment(
  payload: CreateCoffeePaymentInput,
): Promise<ApiResponse<unknown>> {
  try {
    const parse = createCoffeePaymentSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid payment input",
      );
    }

    return await apiClient<ApiResponse<unknown>>("/payments", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function refundPayment(
  paymentId: string,
  payload: RefundPaymentInput,
): Promise<ApiResponse<unknown>> {
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

    return await apiClient<ApiResponse<unknown>>(
      `/payments/${paymentId}/refund`,
      {
        method: "POST",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
