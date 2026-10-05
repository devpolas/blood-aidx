import { BloodGroup, DonationStatus, ID, ISODateString } from "./enum";

export interface BloodDonation {
  id: ID;
  donorId: ID;
  requestId: ID | null;
  organizationId: ID | null;
  locationId: ID | null;
  donationNumber: string;
  bloodGroup: BloodGroup;
  units: number;
  donatedAt: ISODateString;
  status: DonationStatus;
  verifiedAt: ISODateString | null;
  verifiedById: ID | null;
  rejectionReason: string | null;
  notes: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
