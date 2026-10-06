import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";

import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";

import { CertificateResponse } from "@/validators/certificate.validator";

// Get Certificates
// GET /certificates

export async function getCertificates(): Promise<
  ApiResponse<{ certificates: CertificateResponse[] } | null>
> {
  try {
    return await apiClient<
      ApiResponse<{ certificates: CertificateResponse[] }>
    >("/certificates", {
      method: "GET",
    });
  } catch (error) {
    return handleApiError(error);
  }
}

// Get Certificate
// GET /certificates/:id

export async function getCertificate(
  id: string,
): Promise<ApiResponse<{ certificate: CertificateResponse } | null>> {
  try {
    if (!id.trim()) {
      return errorResponse("Certificate ID is required");
    }

    return await apiClient<ApiResponse<{ certificate: CertificateResponse }>>(
      `/certificates/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
