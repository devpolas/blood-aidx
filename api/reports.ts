import apiClient from "@/lib/api.client";
import { ApiResponse } from "@/types/api.response";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateReportInput,
  CreateReportSchema,
  ReportResponse,
  UpdateReportStatusInput,
  UpdateReportStatusSchema,
} from "@/validators/report.validator";

export async function getReports(): Promise<ApiResponse<ReportResponse[]>> {
  try {
    return await apiClient<ApiResponse<ReportResponse[]>>("/reports", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReport(
  id: string,
): Promise<ApiResponse<ReportResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Report ID is required");
    }

    return await apiClient<ApiResponse<ReportResponse>>(`/reports/${id}`, {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createReport(
  payload: CreateReportInput,
): Promise<ApiResponse<ReportResponse>> {
  try {
    const parse = CreateReportSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid report input",
      );
    }

    return await apiClient<ApiResponse<ReportResponse>>("/reports", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReportStatus(
  id: string,
  payload: UpdateReportStatusInput,
): Promise<ApiResponse<ReportResponse>> {
  try {
    if (!id.trim()) {
      return errorResponse("Report ID is required");
    }

    const parse = UpdateReportStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid report status",
      );
    }

    return await apiClient<ApiResponse<ReportResponse>>(
      `/reports/${id}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
