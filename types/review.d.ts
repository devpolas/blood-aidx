import { ID, ISODateString, ReviewStatus } from "./enums";

export interface Review {
  id: ID;
  reviewerId: ID;
  revieweeId: ID | null;
  organizationId: ID | null;
  rating: number;
  comment: string | null;
  status: ReviewStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
