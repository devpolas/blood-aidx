import {
  addConversationParticipant,
  createConversation,
  getConversation,
  getConversations,
  leaveConversation,
  removeConversationParticipant,
} from "@/api/conversations";

import type {
  AddParticipantInput,
  CreateConversationInput,
} from "@/validators/conversation.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

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
  return useMutation({
    mutationFn: (payload: CreateConversationInput) =>
      createConversation(payload),
  });
}

// Add Conversation Participant
export function useAddConversationParticipant() {
  return useMutation({
    mutationFn: ({
      conversationId,
      payload,
    }: {
      conversationId: string;
      payload: AddParticipantInput;
    }) => addConversationParticipant(conversationId, payload),
  });
}

// Remove Conversation Participant
export function useRemoveConversationParticipant() {
  return useMutation({
    mutationFn: ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => removeConversationParticipant(conversationId, userId),
  });
}

// Leave Conversation
export function useLeaveConversation() {
  return useMutation({
    mutationFn: (conversationId: string) => leaveConversation(conversationId),
  });
}
