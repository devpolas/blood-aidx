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
  OrganizationQueryInput,
  UpdateOrganizationInput,
  UpdateOrganizationMemberInput,
  UpdateOrganizationStatusInput,
} from "@/validators/organization.validator";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const organizationKeys = {
  all: ["organizations"] as const,

  list: (query?: OrganizationQueryInput) =>
    [...organizationKeys.all, "list", query] as const,

  me: (query?: OrganizationQueryInput) =>
    [...organizationKeys.all, "me", query] as const,

  detail: (organizationId: string) =>
    [...organizationKeys.all, "detail", organizationId] as const,

  members: (organizationId: string) =>
    [...organizationKeys.all, "members", organizationId] as const,
};

// Organizations

export function useOrganizations(query?: OrganizationQueryInput) {
  return useQuery({
    queryKey: organizationKeys.list(query),
    queryFn: () => getOrganizations(query),
  });
}

// My Organizations

export function useMyOrganizations(query?: OrganizationQueryInput) {
  return useQuery({
    queryKey: organizationKeys.me(query),
    queryFn: () => getMyOrganizations(query),
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

type UpdateOrganizationVariables = {
  organizationId: string;
  payload: UpdateOrganizationInput;
};

// Create Organization

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrganization,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.me(),
      });
    },
  });
}

// Update Organization

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, payload }: UpdateOrganizationVariables) =>
      updateOrganization(organizationId, payload),

    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(organizationId),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.me(),
      });
    },
  });
}

// Delete Organization

export function useDeleteOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrganization,

    onSuccess: (_, organizationId) => {
      queryClient.removeQueries({
        queryKey: organizationKeys.detail(organizationId),
      });

      queryClient.removeQueries({
        queryKey: organizationKeys.members(organizationId),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.me(),
      });
    },
  });
}

type UpdateOrganizationStatusVariables = {
  organizationId: string;
  payload: UpdateOrganizationStatusInput;
};

// Update Organization Status

export function useUpdateOrganizationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: UpdateOrganizationStatusVariables) =>
      updateOrganizationStatus(organizationId, payload),

    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(organizationId),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.list(),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.me(),
      });
    },
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

type AddOrganizationMemberVariables = {
  organizationId: string;
  payload: AddOrganizationMemberInput;
};

// Add Organization Member

export function useAddOrganizationMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ organizationId, payload }: AddOrganizationMemberVariables) =>
      addOrganizationMember(organizationId, payload),

    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(organizationId),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(organizationId),
      });
    },
  });
}

type UpdateOrganizationMemberVariables = {
  organizationId: string;
  memberUserId: string;
  payload: UpdateOrganizationMemberInput;
};

// Update Organization Member

export function useUpdateOrganizationMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      memberUserId,
      payload,
    }: UpdateOrganizationMemberVariables) =>
      updateOrganizationMember(organizationId, memberUserId, payload),

    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(organizationId),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(organizationId),
      });
    },
  });
}

type RemoveOrganizationMemberVariables = {
  organizationId: string;
  memberUserId: string;
};

// Remove Organization Member

export function useRemoveOrganizationMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      memberUserId,
    }: RemoveOrganizationMemberVariables) =>
      removeOrganizationMember(organizationId, memberUserId),

    onSuccess: (_, { organizationId }) => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(organizationId),
      });

      queryClient.invalidateQueries({
        queryKey: organizationKeys.detail(organizationId),
      });
    },
  });
}
