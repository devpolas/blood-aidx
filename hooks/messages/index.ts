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
} from "@/lib/actions/messages";
import type { UpdateMessageInput } from "@/validators/message.validator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    mutationFn: createMessage,
  });
}

type UpdateMessageVariables = {
  messageId: string;
  payload: UpdateMessageInput;
};

// Update Message
export function useUpdateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, payload }: UpdateMessageVariables) =>
      updateMessage(messageId, payload),
    onSuccess: (_, { messageId }) => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.detail(messageId),
      });
    },
  });
}

// Delete Message
export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_, messageId) => {
      queryClient.removeQueries({
        queryKey: messageKeys.detail(messageId),
      });
    },
  });
}

// Moderate Delete Message
export function useModerateDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moderateDeleteMessage,
    onSuccess: (_, messageId) => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.detail(messageId),
      });
    },
  });
}

// Mark Message As Read
export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: (_, messageId) => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.detail(messageId),
      });
    },
  });
}

// Mark Conversation Messages As Read
export function useMarkConversationMessagesAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markConversationMessagesAsRead,
    onSuccess: (_, conversationId) => {
      queryClient.invalidateQueries({
        queryKey: messageKeys.conversation(conversationId),
      });
      queryClient.invalidateQueries({
        queryKey: messageKeys.unreadCount(conversationId),
      });
    },
  });
}
