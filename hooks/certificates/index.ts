import {
  getCertificate,
  getCertificates,
  verifyCertificate,
} from "@/api/certificates";
import { useQuery } from "@tanstack/react-query";

export const certificateKeys = {
  all: ["certificates"] as const,
  list: () => [...certificateKeys.all, "list"] as const,
  detail: (certificateId: string) =>
    [...certificateKeys.all, "detail", certificateId] as const,
  verify: (certificateNumber: string) =>
    [...certificateKeys.all, "verify", certificateNumber] as const,
};

// Certificates

export function useCertificates() {
  return useQuery({
    queryKey: certificateKeys.list(),
    queryFn: getCertificates,
  });
}

// Certificate

export function useCertificate(certificateId: string) {
  return useQuery({
    queryKey: certificateKeys.detail(certificateId),
    queryFn: () => getCertificate(certificateId),
    enabled: Boolean(certificateId),
  });
}

// Verify Certificate

export function useVerifyCertificate(certificateNumber: string) {
  return useQuery({
    queryKey: certificateKeys.verify(certificateNumber),
    queryFn: () => verifyCertificate(certificateNumber),
    enabled: Boolean(certificateNumber),
  });
}
