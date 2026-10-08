import type { ID, ISODateString } from "./enum";

export interface Milestone {
  id: ID;
  name: string;
  description: string;
  donationCount: number;
  badgeUrl: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface UserMilestone {
  id: ID;
  userId: ID;
  milestoneId: ID;
  achievedAt: ISODateString;
}
