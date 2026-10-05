import { ID, ISODateString } from "./enum";

export interface UserMilestone {
  id: ID;
  userId: ID;
  milestoneId: ID;
  achievedAt: ISODateString;
}
