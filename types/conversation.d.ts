import { ConversationType, ID, ISODateString } from "./enums";

export interface Conversation {
  id: ID;
  type: ConversationType;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
