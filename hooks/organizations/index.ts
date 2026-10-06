import {
  addOrganizationMember,
  createOrganization,
  deleteOrganization,
  getMyOrganizations,
  getOrganization,
  getOrganizationMembers,
  getOrganizations,
  removeOrganizationMember,
  updateOrganization,
  updateOrganizationMember,
  updateOrganizationStatus,
} from "@/api/organizations";

import type {
  AddOrganizationMemberInput,
  CreateOrganizationInput,
  UpdateOrganizationInput,
  UpdateOrganizationMemberInput,
  UpdateOrganizationStatusInput,
} from "@/validators/organization.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const organizationKeys = {
  all: ["organizations"] as const,
  list: () => [...organizationKeys.all, "list"] as const,
  me: () => [...organizationKeys.all, "me"] as const,
  detail: (organizationId: string) =>
    [...organizationKeys.all, "detail", organizationId] as const,
  members: (organizationId: string) =>
    [...organizationKeys.all, "members", organizationId] as const,
};

// Organizations
export function useOrganizations() {
  return useQuery({
    queryKey: organizationKeys.list(),
    queryFn: getOrganizations,
  });
}

// My Organizations
export function useMyOrganizations() {
  return useQuery({
    queryKey: organizationKeys.me(),
    queryFn: getMyOrganizations,
  });
}

// Organization
export function useOrganization(organizationId: string) {
  return useQuery({
    queryKey: organizationKeys.detail(organizationId),
    queryFn: () => getOrganization(organizationId),
    enabled: Boolean(organizationId),
  });
}

// Create Organization
export function useCreateOrganization() {
  return useMutation({
    mutationFn: (payload: CreateOrganizationInput) =>
      createOrganization(payload),
  });
}

// Update Organization
export function useUpdateOrganization() {
  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: UpdateOrganizationInput;
    }) => updateOrganization(organizationId, payload),
  });
}

// Delete Organization
export function useDeleteOrganization() {
  return useMutation({
    mutationFn: (organizationId: string) => deleteOrganization(organizationId),
  });
}

// Update Organization Status
export function useUpdateOrganizationStatus() {
  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: UpdateOrganizationStatusInput;
    }) => updateOrganizationStatus(organizationId, payload),
  });
}

// Organization Members
export function useOrganizationMembers(organizationId: string) {
  return useQuery({
    queryKey: organizationKeys.members(organizationId),
    queryFn: () => getOrganizationMembers(organizationId),
    enabled: Boolean(organizationId),
  });
}

// Add Organization Member
export function useAddOrganizationMember() {
  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: AddOrganizationMemberInput;
    }) => addOrganizationMember(organizationId, payload),
  });
}

// Update Organization Member
export function useUpdateOrganizationMember() {
  return useMutation({
    mutationFn: ({
      organizationId,
      memberUserId,
      payload,
    }: {
      organizationId: string;
      memberUserId: string;
      payload: UpdateOrganizationMemberInput;
    }) => updateOrganizationMember(organizationId, memberUserId, payload),
  });
}

// Remove Organization Member
export function useRemoveOrganizationMember() {
  return useMutation({
    mutationFn: ({
      organizationId,
      memberUserId,
    }: {
      organizationId: string;
      memberUserId: string;
    }) => removeOrganizationMember(organizationId, memberUserId),
  });
}
