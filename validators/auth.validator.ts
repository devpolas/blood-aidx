import * as z from "zod";

// Enums

export const UserRoleSchema = z.enum([
  "donor",
  "recipient",
  "volunteer",
  "hospital",
  "blood_bank",
  "moderator",
  "admin",
]);

export const GenderSchema = z.enum([
  "male",
  "female",
  "other",
  "prefer_not_to_say",
]);

// Public Signup Roles
// Admin and moderator should not be selectable during signup

export const PublicUserRoleSchema = z.enum([
  "donor",
  "recipient",
  "volunteer",
  "hospital",
  "blood_bank",
]);

// Common

export const EmailSchema = z
  .email("Invalid email address")
  .transform((value) => value.trim().toLowerCase());

export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be at most 128 characters");

// Signup

export const SignUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  email: EmailSchema,
  password: PasswordSchema,
  gender: GenderSchema,
  role: PublicUserRoleSchema,
});

// Signin

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

// Email Verification

export const VerifyEmailSchema = z.object({
  email: EmailSchema,

  code: z
    .string()
    .trim()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only digits"),
});

// Resend Verification

export const ResendVerificationSchema = z.object({
  email: EmailSchema,
});

// Forgot Password

export const ForgotPasswordSchema = z.object({
  email: EmailSchema,
});

// Verify Password Reset OTP

export const VerifyPasswordResetSchema = z.object({
  email: EmailSchema,

  code: z
    .string()
    .trim()
    .length(6, "Verification code must be 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only digits"),
});

// Reset Password

export const ResetPasswordSchema = z
  .object({
    resetToken: z.string().trim().min(1, "Reset token is required"),
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Change Password

export const ChangePasswordSchema = z
  .object({
    currentPassword: PasswordSchema,
    newPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Logout

export const LogoutSchema = z.object({
  sessionId: z.uuid().optional(),
});

// Logout Other Devices

export const LogoutOtherDevicesSchema = z.object({
  currentSessionId: z.uuid(),
});

// Types

export type UserRole = z.input<typeof UserRoleSchema>;
export type Gender = z.input<typeof GenderSchema>;
export type SignUpInput = z.input<typeof SignUpSchema>;
export type SignInInput = z.input<typeof SignInSchema>;
export type VerifyEmailInput = z.input<typeof VerifyEmailSchema>;
export type ResendVerificationInput = z.input<typeof ResendVerificationSchema>;
export type ForgotPasswordInput = z.input<typeof ForgotPasswordSchema>;
export type VerifyPasswordResetInput = z.input<
  typeof VerifyPasswordResetSchema
>;
export type ResetPasswordInput = z.input<typeof ResetPasswordSchema>;
export type ChangePasswordInput = z.input<typeof ChangePasswordSchema>;
export type LogoutInput = z.input<typeof LogoutSchema>;
export type LogoutOtherDevicesInput = z.input<typeof LogoutOtherDevicesSchema>;
