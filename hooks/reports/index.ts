import {
  createReport,
  deleteReport,
  getMyReports,
  getReport,
  updateReportStatus,
} from "@/api/reports";

import type {
  CreateReportInput,
  UpdateReportStatusInput,
} from "@/validators/report.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const reportKeys = {
  all: ["reports"] as const,
  me: () => [...reportKeys.all, "me"] as const,
  detail: (reportId: string) =>
    [...reportKeys.all, "detail", reportId] as const,
};

// My Reports
export function useMyReports() {
  return useQuery({
    queryKey: reportKeys.me(),
    queryFn: getMyReports,
  });
}

// Report
export function useReport(reportId: string) {
  return useQuery({
    queryKey: reportKeys.detail(reportId),
    queryFn: () => getReport(reportId),
    enabled: Boolean(reportId),
  });
}

// Create Report
export function useCreateReport() {
  return useMutation({
    mutationFn: (payload: CreateReportInput) => createReport(payload),
  });
}

// Update Report Status
export function useUpdateReportStatus() {
  return useMutation({
    mutationFn: ({
      reportId,
      payload,
    }: {
      reportId: string;
      payload: UpdateReportStatusInput;
    }) => updateReportStatus(reportId, payload),
  });
}

// Delete Report
export function useDeleteReport() {
  return useMutation({
    mutationFn: (reportId: string) => deleteReport(reportId),
  });
}
