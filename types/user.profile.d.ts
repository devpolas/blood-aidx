import { ID, ISODateString } from "./enum";

export interface UserProfile {
  id: ID;
  userId: ID;
  phone: string | null;
  dateOfBirth: ISODateString | null;
  bio: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
