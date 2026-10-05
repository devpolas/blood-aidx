import { ID, ISODateString, JsonValue, NotificationType } from "./enum";

export interface Notification {
  id: ID;
  userId: ID;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  readAt: ISODateString | null;
  data: JsonValue | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
