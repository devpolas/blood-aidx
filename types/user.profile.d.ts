import { ID, ISODateString } from "./enums";

export interface UserProfile {
  id: ID;
  userId: ID;
  phone: string | null;
  dateOfBirth: ISODateString | null;
  bio: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
