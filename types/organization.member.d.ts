import { ID, ISODateString, OrganizationMemberRole } from "./enum";

export interface OrganizationMember {
  id: ID;
  organizationId: ID;
  userId: ID;
  role: OrganizationMemberRole;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
