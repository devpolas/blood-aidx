import { ConversationType, ID, ISODateString } from "./enum";

export interface Conversation {
  id: ID;
  type: ConversationType;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
