import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { Report } from "@/types/report";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";
import { handleZodError } from "@/utils/zod.error";
import {
  CreateReportInput,
  CreateReportSchema,
  UpdateReportStatusInput,
  UpdateReportStatusSchema,
} from "@/validators/report.validator";

export async function getMyReports(): Promise<
  ApiResponse<{ reports: Report[] }>
> {
  try {
    return await apiClient<ApiResponse<{ reports: Report[] }>>("/reports/me", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function getReport(
  reportId: string,
): Promise<ApiResponse<{ report: Report }>> {
  try {
    if (!reportId.trim()) {
      return errorResponse("Report ID is required");
    }

    return await apiClient<ApiResponse<{ report: Report }>>(
      `/reports/${reportId}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function createReport(
  payload: CreateReportInput,
): Promise<ApiResponse<{ report: Report }>> {
  try {
    const parse = CreateReportSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid report input",
      );
    }

    return await apiClient<ApiResponse<{ report: Report }>>("/reports", {
      method: "POST",
      body: parse.data,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateReportStatus(
  reportId: string,
  payload: UpdateReportStatusInput,
): Promise<ApiResponse<{ report: Report }>> {
  try {
    if (!reportId.trim()) {
      return errorResponse("Report ID is required");
    }

    const parse = UpdateReportStatusSchema.safeParse(payload);

    if (!parse.success) {
      return errorResponse(
        handleZodError(parse.error) || "Invalid report status",
      );
    }

    return await apiClient<ApiResponse<{ report: Report }>>(
      `/reports/${reportId}/status`,
      {
        method: "PATCH",
        body: parse.data,
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function deleteReport(
  reportId: string,
): Promise<ApiResponse<null>> {
  try {
    if (!reportId.trim()) {
      return errorResponse("Report ID is required");
    }

    return await apiClient<ApiResponse<null>>(`/reports/${reportId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
