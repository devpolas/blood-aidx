export interface BloodRequestCardData {
  id: string;
  requesterId: string;
  organizationId: string;
  bloodGroup: string;
  unitsRequired: number;
  unitsFulfilled: number;
  priority: string;
  status: string;
  patientName: string | null;
  patientAge: number | null;
  requiredAt: string | null;
  expiresAt: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;

  requester?: {
    id?: string;
    name?: string | null;
    fullName?: string | null;
  } | null;

  organization?: {
    id?: string;
    name?: string | null;
    type?: string | null;
    status?: string | null;
  } | null;

  location?: {
    id?: string;
    address?: string | null;
    area?: string | null;
    city?: string | null;
    district?: string | null;
    division?: string | null;
  } | null;
}

export interface BloodRequestActionProps {
  request: BloodRequestCardData;
  isOwner?: boolean;
  onView?: (request: BloodRequestCardData) => void;
  onRespond?: (request: BloodRequestCardData) => void;
  onEdit?: (request: BloodRequestCardData) => void;
  onCancel?: (request: BloodRequestCardData) => void;
  onDelete?: (request: BloodRequestCardData) => void;
}
