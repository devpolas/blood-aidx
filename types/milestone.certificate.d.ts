import type { ID, ISODateString } from "./enum";

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
