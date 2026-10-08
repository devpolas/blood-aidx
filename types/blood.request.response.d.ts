import type { ID, ISODateString, RequestResponseStatus } from "./enum";

export interface BloodRequestResponse {
  id: ID;
  requestId: ID;
  donorId: ID;
  status: RequestResponseStatus;
  message: string | null;
  respondedAt: ISODateString;
  acceptedAt: ISODateString | null;
  completedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
