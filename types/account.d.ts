import { ID, ISODateString } from "./enums";

export interface Account {
  id: ID;
  userId: ID;
  providerId: string;
  accountId: string;
  password: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string | null;
  scope: string | null;
  accessTokenExpiresAt: ISODateString | null;
  refreshTokenExpiresAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
