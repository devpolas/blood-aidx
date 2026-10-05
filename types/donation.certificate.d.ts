import { BloodGroup, ID, ISODateString } from "./enum";

export interface DonationCertificate {
  id: ID;
  donationId: ID;
  certificateNo: string;
  verificationCode: string;
  donorName: string;
  bloodGroup: BloodGroup;
  donationNumber: number;
  donatedAt: ISODateString;
  issuedAt: ISODateString;
  certificateUrl: string | null;
  createdAt: ISODateString;
}
