import { ID, ISODateString } from "./enums";

export interface MilestoneCertificate {
  id: ID;
  userMilestoneId: ID;
  certificateNo: string;
  verificationCode: string;
  donorName: string;
  donationCount: number;
  achievedAt: ISODateString;
  issuedAt: ISODateString;
  certificateUrl: string | null;
  createdAt: ISODateString;
}
