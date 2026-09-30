import {
  ID,
  ISODateString,
  JsonValue,
  PaymentProvider,
  PaymentStatus,
  PaymentType,
} from "./enums";

export interface Payment {
  id: ID;
  payerId: ID;
  donorId: ID;
  type: PaymentType;
  provider: PaymentProvider;
  status: PaymentStatus;
  amount: number;
  refundedAmount: number;
  currency: string;
  message: string | null;
  description: string | null;
  stripePaymentIntentId: string | null;
  stripeCheckoutSessionId: string | null;
  stripeCustomerId: string | null;
  paidAt: ISODateString | null;
  refundedAt: ISODateString | null;
  metadata: JsonValue | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
