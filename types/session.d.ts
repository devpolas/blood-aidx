import { ID, ISODateString } from "./enums";

export interface Session {
  id: ID;
  token: string;
  userId: ID;
  expiresAt: ISODateString;
  ipAddress: string | null;
  userAgent: string | null;
  impersonatedBy: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
