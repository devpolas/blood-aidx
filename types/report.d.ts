import { ID, ISODateString, ReportStatus, ReportType } from "./enum";

export interface Report {
  id: ID;
  reporterId: ID;
  resolvedById: ID | null;
  type: ReportType;
  targetId: ID;
  reason: string;
  description: string | null;
  status: ReportStatus;
  resolvedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
