import { ID, ISODateString } from "./enum";

export interface DonationMilestone {
  id: ID;
  name: string;
  description: string;
  donationCount: number;
  badgeUrl: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
