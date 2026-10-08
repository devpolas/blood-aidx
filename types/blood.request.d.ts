import type {
  BloodGroup,
  BloodRequestStatus,
  ID,
  ISODateString,
  Priority,
} from "./enum";

export interface BloodRequest {
  id: ID;
  requesterId: ID;
  organizationId: ID;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  unitsFulfilled: number;
  priority: Priority;
  status: BloodRequestStatus;
  patientName: string | null;
  patientAge: number | null;
  requiredAt: ISODateString | null;
  expiresAt: ISODateString | null;
  description: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
