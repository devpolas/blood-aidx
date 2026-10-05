import { AuditAction, ID, ISODateString, JsonValue } from "./enum";

export interface AuditLog {
  id: ID;
  userId: ID | null;
  action: AuditAction;
  entityType: string;
  entityId: ID | null;
  oldData: JsonValue | null;
  newData: JsonValue | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: ISODateString;
}
