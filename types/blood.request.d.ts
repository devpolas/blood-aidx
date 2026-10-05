import {
  BloodGroup,
  BloodRequestStatus,
  ID,
  ISODateString,
  Priority,
} from "./enum";

export interface BloodRequest {
  id: ID;
  requesterId: ID;
  locationId: ID | null;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  unitsFulfilled: number;
  priority: Priority;
  status: BloodRequestStatus;
  patientName: string | null;
  patientAge: number | null;
  hospitalName: string | null;
  requiredAt: ISODateString | null;
  expiresAt: ISODateString | null;
  description: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
