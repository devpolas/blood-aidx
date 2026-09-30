import { ID, ISODateString } from "./enums";

export interface ConversationParticipant {
  id: ID;
  conversationId: ID;
  userId: ID;
  joinedAt: ISODateString;
  lastReadAt: ISODateString | null;
}
