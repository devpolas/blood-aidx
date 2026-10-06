import {
  createCoffeePayment,
  getDonorPayments,
  getMyPayments,
  getPayment,
  getPaymentForAdmin,
  refundPayment,
} from "@/api/payments";

import type {
  CreateCoffeePaymentInput,
  RefundPaymentInput,
} from "@/validators/payment.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const paymentKeys = {
  all: ["payments"] as const,
  me: () => [...paymentKeys.all, "me"] as const,
  donor: (donorId: string) => [...paymentKeys.all, "donor", donorId] as const,
  detail: (paymentId: string) =>
    [...paymentKeys.all, "detail", paymentId] as const,
  adminDetail: (paymentId: string) =>
    [...paymentKeys.all, "admin", paymentId] as const,
};

// My Payments
export function useMyPayments() {
  return useQuery({
    queryKey: paymentKeys.me(),
    queryFn: getMyPayments,
  });
}

// Donor Payments
export function useDonorPayments(donorId: string) {
  return useQuery({
    queryKey: paymentKeys.donor(donorId),
    queryFn: () => getDonorPayments(donorId),
    enabled: Boolean(donorId),
  });
}

// Payment
export function usePayment(paymentId: string) {
  return useQuery({
    queryKey: paymentKeys.detail(paymentId),
    queryFn: () => getPayment(paymentId),
    enabled: Boolean(paymentId),
  });
}

// Payment For Admin
export function usePaymentForAdmin(paymentId: string) {
  return useQuery({
    queryKey: paymentKeys.adminDetail(paymentId),
    queryFn: () => getPaymentForAdmin(paymentId),
    enabled: Boolean(paymentId),
  });
}

// Create Coffee Payment
export function useCreateCoffeePayment() {
  return useMutation({
    mutationFn: (payload: CreateCoffeePaymentInput) =>
      createCoffeePayment(payload),
  });
}

// Refund Payment
export function useRefundPayment() {
  return useMutation({
    mutationFn: ({
      paymentId,
      payload,
    }: {
      paymentId: string;
      payload: RefundPaymentInput;
    }) => refundPayment(paymentId, payload),
  });
}
