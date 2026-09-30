import { Gender, ID, ISODateString, UserRole } from "./enums";

export interface User {
  id: ID;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  gender: Gender | null;
  banned: boolean;
  banReason: string | null;
  banExpires: ISODateString | null;
  locationId: ID | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
