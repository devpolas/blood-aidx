import * as z from "zod";

// Enums

export const BloodGroupSchema = z.enum([
  "a_positive",
  "a_negative",
  "b_positive",
  "b_negative",
  "ab_positive",
  "ab_negative",
  "o_positive",
  "o_negative",
]);

export const PrioritySchema = z.enum(["low", "high", "urgent"]);

export const BloodRequestStatusSchema = z.enum([
  "open",
  "partially_fulfilled",
  "fulfilled",
  "cancelled",
  "expired",
]);

// Create Blood Request

export const CreateBloodRequestSchema = z
  .object({
    organizationId: z.string().trim(),

    bloodGroup: z.string().trim(),

    unitsRequired: z
      .number({
        error: "Units required is required",
      })
      .int("Units required must be a whole number")
      .positive("Units required must be greater than 0")
      .max(100, "Units required cannot exceed 100")
      .optional(),

    priority: z.string().trim(),

    patientName: z
      .string()
      .trim()
      .max(150, "Patient name must be at most 150 characters"),

    patientAge: z
      .number({
        error: "Patient age is required",
      })
      .int("Patient age must be a whole number")
      .min(0, "Patient age cannot be negative")
      .max(150, "Patient age must be at most 150")
      .optional(),

    requiredAt: z.string().trim(),

    expiresAt: z.string().trim(),

    description: z
      .string()
      .trim()
      .max(2000, "Description must be at most 2000 characters"),
  })
  .superRefine((data, ctx) => {
    // Organization
    if (!data.organizationId) {
      ctx.addIssue({
        code: "custom",
        path: ["organizationId"],
        message: "Please select an organization",
      });
    } else if (!z.uuid().safeParse(data.organizationId).success) {
      ctx.addIssue({
        code: "custom",
        path: ["organizationId"],
        message: "Please select a valid organization",
      });
    }

    // Blood group
    if (!data.bloodGroup) {
      ctx.addIssue({
        code: "custom",
        path: ["bloodGroup"],
        message: "Please select a blood group",
      });
    } else if (!BloodGroupSchema.safeParse(data.bloodGroup).success) {
      ctx.addIssue({
        code: "custom",
        path: ["bloodGroup"],
        message: "Please select a valid blood group",
      });
    }

    // Units required
    if (data.unitsRequired === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["unitsRequired"],
        message: "Please enter the number of units required",
      });
    }

    // Priority
    if (!data.priority) {
      ctx.addIssue({
        code: "custom",
        path: ["priority"],
        message: "Please select a priority",
      });
    } else if (!PrioritySchema.safeParse(data.priority).success) {
      ctx.addIssue({
        code: "custom",
        path: ["priority"],
        message: "Please select a valid priority",
      });
    }

    // Patient name
    if (!data.patientName) {
      ctx.addIssue({
        code: "custom",
        path: ["patientName"],
        message: "Please enter the patient's name",
      });
    } else if (data.patientName.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["patientName"],
        message: "Patient name must be at least 2 characters",
      });
    }

    // Patient age
    if (data.patientAge === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["patientAge"],
        message: "Please enter the patient's age",
      });
    }

    // Required date
    const requiredAtResult = z.iso.datetime().safeParse(data.requiredAt);

    if (!data.requiredAt) {
      ctx.addIssue({
        code: "custom",
        path: ["requiredAt"],
        message: "Please select when the blood is required",
      });
    } else if (!requiredAtResult.success) {
      ctx.addIssue({
        code: "custom",
        path: ["requiredAt"],
        message: "Please select a valid required date",
      });
    }

    // Expiration date
    const expiresAtResult = z.iso.datetime().safeParse(data.expiresAt);

    if (!data.expiresAt) {
      ctx.addIssue({
        code: "custom",
        path: ["expiresAt"],
        message: "Please select when this request expires",
      });
    } else if (!expiresAtResult.success) {
      ctx.addIssue({
        code: "custom",
        path: ["expiresAt"],
        message: "Please select a valid expiration date",
      });
    }

    // Required date cannot be in the past
    if (requiredAtResult.success) {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const requiredAt = new Date(data.requiredAt);

      requiredAt.setHours(0, 0, 0, 0);

      if (requiredAt < today) {
        ctx.addIssue({
          code: "custom",
          path: ["requiredAt"],
          message: "Required date cannot be in the past",
        });
      }
    }

    // Expiration must be after required date
    if (requiredAtResult.success && expiresAtResult.success) {
      const requiredAt = new Date(data.requiredAt);
      const expiresAt = new Date(data.expiresAt);

      if (expiresAt <= requiredAt) {
        ctx.addIssue({
          code: "custom",
          path: ["expiresAt"],
          message: "Expiration date must be after the required date",
        });
      }
    }
  })
  .strict();

// Update Blood Request

export const UpdateBloodRequestSchema = z
  .object({
    organizationId: z.uuid().optional(),
    bloodGroup: BloodGroupSchema.optional(),
    unitsRequired: z.number().int().positive().max(100).optional(),
    priority: PrioritySchema.optional(),
    patientName: z.string().trim().min(2).max(150).nullable().optional(),
    patientAge: z.number().int().min(0).max(150).nullable().optional(),
    requiredAt: z.iso.datetime().nullable().optional(),
    expiresAt: z.iso.datetime().nullable().optional(),
    description: z.string().trim().max(2000).nullable().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (!data.requiredAt || !data.expiresAt) return;

    const requiredAt = new Date(data.requiredAt);
    const expiresAt = new Date(data.expiresAt);

    if (expiresAt <= requiredAt) {
      ctx.addIssue({
        code: "custom",
        path: ["expiresAt"],
        message: "Expiration time must be after required time",
      });
    }
  });

// Update Status

export const UpdateBloodRequestStatusSchema = z
  .object({
    status: BloodRequestStatusSchema,
  })
  .strict();

// Response

export const BloodRequestSchema = z.object({
  id: z.uuid(),
  requesterId: z.uuid(),
  organizationId: z.uuid(),
  bloodGroup: BloodGroupSchema,
  unitsRequired: z.number().int(),
  unitsFulfilled: z.number().int(),
  priority: PrioritySchema,
  status: BloodRequestStatusSchema,
  patientName: z.string().nullable(),
  patientAge: z.number().int().nullable(),
  requiredAt: z.string().nullable(),
  expiresAt: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Types

export type CreateBloodRequestInput = z.input<typeof CreateBloodRequestSchema>;
export type BloodRequestFormValues = z.input<typeof CreateBloodRequestSchema>;
export type UpdateBloodRequestInput = z.input<typeof UpdateBloodRequestSchema>;

export type UpdateBloodRequestStatusInput = z.input<
  typeof UpdateBloodRequestStatusSchema
>;

export type BloodRequestResponse = z.input<typeof BloodRequestSchema>;

// API Query Features

export const BloodRequestSortBySchema = z.enum([
  "createdAt",
  "updatedAt",
  "requiredAt",
  "expiresAt",
  "unitsRequired",
  "unitsFulfilled",
  "priority",
  "status",
]);

export const BloodRequestQuerySchema = z
  .object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),

    search: z.string().trim().min(1).max(100).optional(),

    bloodGroup: BloodGroupSchema.optional(),
    priority: PrioritySchema.optional(),
    status: BloodRequestStatusSchema.optional(),

    organizationId: z.uuid().optional(),

    country: z.string().trim().min(1).max(100).optional(),
    division: z.string().trim().min(1).max(100).optional(),
    city: z.string().trim().min(1).max(100).optional(),

    requiredAtFrom: z.iso.datetime().optional(),
    requiredAtTo: z.iso.datetime().optional(),

    expiresAtFrom: z.iso.datetime().optional(),
    expiresAtTo: z.iso.datetime().optional(),

    createdAtFrom: z.iso.datetime().optional(),
    createdAtTo: z.iso.datetime().optional(),

    sortBy: BloodRequestSortBySchema.default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  })
  .strict()
  .superRefine((data, ctx) => {
    const dateRanges = [
      [
        "requiredAtFrom",
        "requiredAtTo",
        data.requiredAtFrom,
        data.requiredAtTo,
      ],
      ["expiresAtFrom", "expiresAtTo", data.expiresAtFrom, data.expiresAtTo],
      ["createdAtFrom", "createdAtTo", data.createdAtFrom, data.createdAtTo],
    ] as const;

    for (const [fromKey, toKey, from, to] of dateRanges) {
      if (!from || !to) continue;

      if (new Date(to) < new Date(from)) {
        ctx.addIssue({
          code: "custom",
          path: [toKey],
          message: `${toKey} must be greater than or equal to ${fromKey}`,
        });
      }
    }
  });

export type BloodRequestQueryInput = z.input<typeof BloodRequestQuerySchema>;
