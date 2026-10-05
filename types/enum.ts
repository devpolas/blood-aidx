export type ID = string;
export type ISODateString = string;
export type JsonValue = unknown;

// User
export const UserRole = {
  USER: "user",
  MODERATOR: "moderator",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Gender = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
  PREFER_NOT_TO_SAY: "prefer_not_to_say",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

// Blood
export const BloodGroup = {
  A_POSITIVE: "a_positive",
  A_NEGATIVE: "a_negative",
  B_POSITIVE: "b_positive",
  B_NEGATIVE: "b_negative",
  AB_POSITIVE: "ab_positive",
  AB_NEGATIVE: "ab_negative",
  O_POSITIVE: "o_positive",
  O_NEGATIVE: "o_negative",
} as const;

export type BloodGroup = (typeof BloodGroup)[keyof typeof BloodGroup];

export const Priority = {
  LOW: "low",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const DonorAvailability = {
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
  TEMPORARILY_UNAVAILABLE: "temporarily_unavailable",
} as const;

export type DonorAvailability =
  (typeof DonorAvailability)[keyof typeof DonorAvailability];

export const BloodRequestStatus = {
  OPEN: "open",
  PARTIALLY_FULFILLED: "partially_fulfilled",
  FULFILLED: "fulfilled",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
} as const;

export type BloodRequestStatus =
  (typeof BloodRequestStatus)[keyof typeof BloodRequestStatus];

export const RequestResponseStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

export type RequestResponseStatus =
  (typeof RequestResponseStatus)[keyof typeof RequestResponseStatus];

export const DonationStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
} as const;

export type DonationStatus =
  (typeof DonationStatus)[keyof typeof DonationStatus];

// Organizations
export const OrganizationType = {
  HOSPITAL: "hospital",
  BLOOD_BANK: "blood_bank",
  CLINIC: "clinic",
  NGO: "ngo",
  OTHER: "other",
} as const;

export type OrganizationType =
  (typeof OrganizationType)[keyof typeof OrganizationType];

export const OrganizationStatus = {
  PENDING: "pending",
  ACTIVE: "active",
  VERIFIED: "verified",
  SUSPENDED: "suspended",
  REJECTED: "rejected",
} as const;

export type OrganizationStatus =
  (typeof OrganizationStatus)[keyof typeof OrganizationStatus];

export const OrganizationMemberRole = {
  ADMIN: "admin",
  STAFF: "staff",
  VERIFIER: "verifier",
} as const;

export type OrganizationMemberRole =
  (typeof OrganizationMemberRole)[keyof typeof OrganizationMemberRole];

// Communication
export const NotificationType = {
  BLOOD_REQUEST: "blood_request",
  DONATION: "donation",
  DONATION_VERIFIED: "donation_verified",
  CERTIFICATE: "certificate",
  MILESTONE: "milestone",
  MESSAGE: "message",
  SYSTEM: "system",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const ConversationType = {
  DIRECT: "direct",
  BLOOD_REQUEST: "blood_request",
  ORGANIZATION: "organization",
} as const;

export type ConversationType =
  (typeof ConversationType)[keyof typeof ConversationType];

// Moderation
export const ReviewStatus = {
  PENDING: "pending",
  PUBLISHED: "published",
  HIDDEN: "hidden",
  REJECTED: "rejected",
} as const;

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];

export const ReportType = {
  USER: "user",
  BLOOD_REQUEST: "blood_request",
  DONATION: "donation",
  ORGANIZATION: "organization",
  MESSAGE: "message",
  REVIEW: "review",
} as const;

export type ReportType = (typeof ReportType)[keyof typeof ReportType];

export const ReportStatus = {
  PENDING: "pending",
  REVIEWING: "reviewing",
  RESOLVED: "resolved",
  REJECTED: "rejected",
} as const;

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];

export const AuditAction = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  LOGIN: "login",
  LOGOUT: "logout",
  VERIFY: "verify",
  SUSPEND: "suspend",
  BAN: "ban",
  RESTORE: "restore",
} as const;

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];

// Payments
export const PaymentStatus = {
  PENDING: "pending",
  PROCESSING: "processing",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentType = {
  DONOR_COFFEE: "donor_coffee",
} as const;

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const PaymentProvider = {
  STRIPE: "stripe",
} as const;

export type PaymentProvider =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];

// Enum value arrays
const values = <T extends Record<string, string>>(object: T) =>
  Object.values(object) as Array<T[keyof T]>;

export const USER_ROLES = values(UserRole);
export const GENDERS = values(Gender);
export const BLOOD_GROUPS = values(BloodGroup);
export const PRIORITIES = values(Priority);
export const DONOR_AVAILABILITIES = values(DonorAvailability);
export const BLOOD_REQUEST_STATUSES = values(BloodRequestStatus);
export const REQUEST_RESPONSE_STATUSES = values(RequestResponseStatus);
export const DONATION_STATUSES = values(DonationStatus);
export const ORGANIZATION_TYPES = values(OrganizationType);
export const ORGANIZATION_STATUSES = values(OrganizationStatus);
export const ORGANIZATION_MEMBER_ROLES = values(OrganizationMemberRole);
export const NOTIFICATION_TYPES = values(NotificationType);
export const CONVERSATION_TYPES = values(ConversationType);
export const REVIEW_STATUSES = values(ReviewStatus);
export const REPORT_TYPES = values(ReportType);
export const REPORT_STATUSES = values(ReportStatus);
export const AUDIT_ACTIONS = values(AuditAction);
export const PAYMENT_STATUSES = values(PaymentStatus);
export const PAYMENT_TYPES = values(PaymentType);
export const PAYMENT_PROVIDERS = values(PaymentProvider);
