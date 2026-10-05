import { ID, ISODateString } from "./enum";

export interface ConversationParticipant {
  id: ID;
  conversationId: ID;
  userId: ID;
  joinedAt: ISODateString;
  lastReadAt: ISODateString | null;
}
