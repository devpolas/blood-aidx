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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.me(),
      });
    },
  });
}

type UpdateReportStatusVariables = {
  reportId: string;
  payload: UpdateReportStatusInput;
};

// Update Report Status
export function useUpdateReportStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, payload }: UpdateReportStatusVariables) =>
      updateReportStatus(reportId, payload),
    onSuccess: (_, { reportId }) => {
      queryClient.invalidateQueries({
        queryKey: reportKeys.detail(reportId),
      });
      queryClient.invalidateQueries({
        queryKey: reportKeys.me(),
      });
    },
  });
}

// Delete Report
export function useDeleteReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReport,
    onSuccess: (_, reportId) => {
      queryClient.removeQueries({
        queryKey: reportKeys.detail(reportId),
      });
      queryClient.invalidateQueries({
        queryKey: reportKeys.me(),
      });
    },
  });
}
