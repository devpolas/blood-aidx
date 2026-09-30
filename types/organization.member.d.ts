import { ID, ISODateString, OrganizationMemberRole } from "./enums";

export interface OrganizationMember {
  id: ID;
  organizationId: ID;
  userId: ID;
  role: OrganizationMemberRole;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
