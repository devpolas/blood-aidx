import { ID, ISODateString, ReviewStatus } from "./enum";

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
