import type {
  ID,
  ISODateString,
  OrganizationStatus,
  OrganizationType,
} from "./enum";

export interface Organization {
  id: ID;
  ownerId: ID;
  locationId: ID | null;
  name: string;
  slug: string;
  type: OrganizationType;
  status: OrganizationStatus;
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  verifiedById: ID | null;
  verifiedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
