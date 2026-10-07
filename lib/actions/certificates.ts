import apiClient from "@/lib/api.client";

import { ApiResponse } from "@/types/api.response";
import { DonationCertificate } from "@/types/donation.certificate";
import { handleApiError } from "@/utils/api.error";
import { errorResponse } from "@/utils/api.response";

// Get My Certificates
// GET /certificates/me
export async function getCertificates(): Promise<
  ApiResponse<DonationCertificate[]>
> {
  try {
    return await apiClient<ApiResponse<DonationCertificate[]>>(
      "/certificates/me",
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Get My Certificate
// GET /certificates/me/:certificateId
export async function getCertificate(
  id: string,
): Promise<ApiResponse<{ certificate: DonationCertificate }>> {
  try {
    if (!id.trim()) {
      return errorResponse("Certificate ID is required");
    }

    return await apiClient<ApiResponse<{ certificate: DonationCertificate }>>(
      `/certificates/me/${id}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}

// Verify Certificate
// GET /certificates/verify/:certificateNumber
export async function verifyCertificate(
  certificateNumber: string,
): Promise<ApiResponse<{ certificate: DonationCertificate }>> {
  try {
    if (!certificateNumber.trim()) {
      return errorResponse("Certificate number is required");
    }

    return await apiClient<ApiResponse<{ certificate: DonationCertificate }>>(
      `/certificates/verify/${certificateNumber}`,
      {
        method: "GET",
      },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
