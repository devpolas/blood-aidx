import { ID, ISODateString } from "./enums";

export interface UserMilestone {
  id: ID;
  userId: ID;
  milestoneId: ID;
  achievedAt: ISODateString;
}
