import { BloodGroup, DonorAvailability, ID, ISODateString } from "./enums";

export interface DonorProfile {
  id: ID;
  userId: ID;
  bloodGroup: BloodGroup;
  availability: DonorAvailability;
  lastDonationAt: ISODateString | null;
  totalDonations: number;
  isEligible: boolean;
  eligibilityCheckedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
