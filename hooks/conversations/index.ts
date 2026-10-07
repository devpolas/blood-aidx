import {
  addConversationParticipant,
  createConversation,
  getConversation,
  getConversations,
  leaveConversation,
  removeConversationParticipant,
} from "@/api/conversations";
import type { AddParticipantInput } from "@/validators/conversation.validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const conversationKeys = {
  all: ["conversations"] as const,
  list: () => [...conversationKeys.all, "list"] as const,
  detail: (conversationId: string) =>
    [...conversationKeys.all, "detail", conversationId] as const,
};

// Conversations

export function useConversations() {
  return useQuery({
    queryKey: conversationKeys.list(),
    queryFn: getConversations,
  });
}

// Conversation

export function useConversation(conversationId: string) {
  return useQuery({
    queryKey: conversationKeys.detail(conversationId),
    queryFn: () => getConversation(conversationId),
    enabled: Boolean(conversationId),
  });
}

// Create Conversation

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.list(),
      });
    },
  });
}

// Add Conversation Participant

type AddConversationParticipantVariables = {
  conversationId: string;
  payload: AddParticipantInput;
};

export function useAddConversationParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      payload,
    }: AddConversationParticipantVariables) =>
      addConversationParticipant(conversationId, payload),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.detail(conversationId),
      });

      queryClient.invalidateQueries({
        queryKey: conversationKeys.list(),
      });
    },
  });
}

// Remove Conversation Participant

type RemoveConversationParticipantVariables = {
  conversationId: string;
  userId: string;
};

export function useRemoveConversationParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
    }: RemoveConversationParticipantVariables) =>
      removeConversationParticipant(conversationId, userId),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.detail(conversationId),
      });

      queryClient.invalidateQueries({
        queryKey: conversationKeys.list(),
      });
    },
  });
}

// Leave Conversation

export function useLeaveConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leaveConversation,
    onSuccess: (_, conversationId) => {
      queryClient.removeQueries({
        queryKey: conversationKeys.detail(conversationId),
      });

      queryClient.invalidateQueries({
        queryKey: conversationKeys.list(),
      });
    },
  });
}
