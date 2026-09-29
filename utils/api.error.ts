import { ApiResponse } from "@/types/api.response";
import { errorResponse } from "./api.response";

export function handleApiError<T = null>(error: unknown): ApiResponse<T> {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    error.data
  ) {
    return error.data as ApiResponse<T>;
  }

  if (error instanceof Error) {
    return errorResponse<T>(error.message);
  }

  return errorResponse<T>("Network error");
}
