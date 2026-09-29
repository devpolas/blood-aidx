import { ApiResponse, Meta } from "@/types/api.response";

export function successResponse<T>(
  data: T,
  message = "success",
  meta?: Meta,
): ApiResponse<T> {
  return {
    success: true,
    message,
    timestamp: new Date().toISOString(),
    data,
    ...(meta && { meta }),
  };
}

export function errorResponse<T = null>(
  message = "something went wrong",
): ApiResponse<T> {
  return {
    success: false,
    message,
    timestamp: new Date().toISOString(),
  };
}
