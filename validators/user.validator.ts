import * as z from "zod";
import { GenderSchema } from "./auth.validator";

export const UpdateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    image: z.url().nullable().optional(),
    gender: GenderSchema.nullable().optional(),
  })
  .strict();

export const UserIdSchema = z.object({
  id: z.uuid(),
});

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.string(),
  gender: GenderSchema.nullable(),
  banned: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UpdateUserInput = z.input<typeof UpdateUserSchema>;
export type UserResponse = z.input<typeof UserSchema>;

export const AdminAssignableRoleSchema = z.enum(["user", "moderator"]);

export const AdminUpdateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    image: z.url().nullable().optional(),
    gender: GenderSchema.nullable().optional(),
  })
  .strict();

export const AdminUpdateUserRoleSchema = z
  .object({
    role: AdminAssignableRoleSchema,
  })
  .strict();

export const BanUserSchema = z
  .object({
    reason: z.string().trim().min(3).max(500),
    expiresAt: z.iso.datetime().nullable().optional(),
  })
  .strict();

export type AdminUpdateUserInput = z.input<typeof AdminUpdateUserSchema>;

export type AdminUpdateUserRoleInput = z.input<
  typeof AdminUpdateUserRoleSchema
>;

export type BanUserInput = z.input<typeof BanUserSchema>;
