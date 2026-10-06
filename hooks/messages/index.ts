import {
  createMessage,
  deleteMessage,
  getConversationMessages,
  getMessage,
  getUnreadCount,
  markConversationMessagesAsRead,
  markMessageAsRead,
  moderateDeleteMessage,
  updateMessage,
} from "@/api/messages";

import type {
  CreateMessageInput,
  UpdateMessageInput,
} from "@/validators/message.validator";

import { useMutation, useQuery } from "@tanstack/react-query";

export const messageKeys = {
  all: ["messages"] as const,
  conversation: (conversationId: string) =>
    [...messageKeys.all, "conversation", conversationId] as const,
  unreadCount: (conversationId: string) =>
    [...messageKeys.all, "unread-count", conversationId] as const,
  detail: (messageId: string) =>
    [...messageKeys.all, "detail", messageId] as const,
};

// Conversation Messages
export function useConversationMessages(conversationId: string) {
  return useQuery({
    queryKey: messageKeys.conversation(conversationId),
    queryFn: () => getConversationMessages(conversationId),
    enabled: Boolean(conversationId),
  });
}

// Unread Count
export function useUnreadCount(conversationId: string) {
  return useQuery({
    queryKey: messageKeys.unreadCount(conversationId),
    queryFn: () => getUnreadCount(conversationId),
    enabled: Boolean(conversationId),
  });
}

// Message
export function useMessage(messageId: string) {
  return useQuery({
    queryKey: messageKeys.detail(messageId),
    queryFn: () => getMessage(messageId),
    enabled: Boolean(messageId),
  });
}

// Create Message
export function useCreateMessage() {
  return useMutation({
    mutationFn: (payload: CreateMessageInput) => createMessage(payload),
  });
}

// Update Message
export function useUpdateMessage() {
  return useMutation({
    mutationFn: ({
      messageId,
      payload,
    }: {
      messageId: string;
      payload: UpdateMessageInput;
    }) => updateMessage(messageId, payload),
  });
}

// Delete Message
export function useDeleteMessage() {
  return useMutation({
    mutationFn: (messageId: string) => deleteMessage(messageId),
  });
}

// Moderate Delete Message
export function useModerateDeleteMessage() {
  return useMutation({
    mutationFn: (messageId: string) => moderateDeleteMessage(messageId),
  });
}

// Mark Message As Read
export function useMarkMessageAsRead() {
  return useMutation({
    mutationFn: (messageId: string) => markMessageAsRead(messageId),
  });
}

// Mark Conversation Messages As Read
export function useMarkConversationMessagesAsRead() {
  return useMutation({
    mutationFn: (conversationId: string) =>
      markConversationMessagesAsRead(conversationId),
  });
}
