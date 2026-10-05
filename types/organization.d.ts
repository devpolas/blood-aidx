import {
  ID,
  ISODateString,
  OrganizationStatus,
  OrganizationType,
} from "./enum";

export interface Organization {
  id: ID;
  ownerId: ID;
  locationId: ID | null;
  verifiedById: ID | null;
  name: string;
  slug: string;
  type: OrganizationType;
  status: OrganizationStatus;
  description: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  registrationNo: string | null;
  verifiedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
