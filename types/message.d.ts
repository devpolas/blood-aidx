import { ID, ISODateString } from "./enum";

export interface Message {
  id: ID;
  conversationId: ID;
  senderId: ID;
  content: string;
  isEdited: boolean;
  editedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
