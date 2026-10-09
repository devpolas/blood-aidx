import * as z from "zod";

const latitudeSchema = z
  .string()
  .regex(/^-?\d+(\.\d+)?$/, "Please enter a valid latitude")
  .refine((value) => Number(value) >= -90 && Number(value) <= 90, {
    message: "Latitude must be between -90 and 90",
  });

const longitudeSchema = z
  .string()
  .regex(/^-?\d+(\.\d+)?$/, "Please enter a valid longitude")
  .refine((value) => Number(value) >= -180 && Number(value) <= 180, {
    message: "Longitude must be between -180 and 180",
  });

const LocationFieldsSchema = z.object({
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  country: z
    .string()
    .trim()
    .min(1, "Please enter your country")
    .max(100, "Country must be at most 100 characters"),

  division: z
    .string()
    .trim()
    .min(1, "Please enter your division")
    .max(100, "Division must be at most 100 characters"),

  city: z
    .string()
    .trim()
    .min(1, "Please enter your city")
    .max(100, "City must be at most 100 characters"),

  village: z
    .string()
    .trim()
    .min(1, "Please enter your village or area")
    .max(100, "Village must be at most 100 characters"),

  postalCode: z
    .string()
    .trim()
    .min(1, "Please enter your postal code")
    .max(20, "Postal code must be at most 20 characters"),

  addressLine: z
    .string()
    .trim()
    .max(255, "Address must be at most 255 characters")
    .optional(),
});

export const LocationCreateSchema = LocationFieldsSchema.superRefine(
  (data, ctx) => {
    if (data.latitude) {
      const result = latitudeSchema.safeParse(data.latitude);

      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          path: ["latitude"],
          message:
            result.error.issues[0]?.message ?? "Please enter a valid latitude",
        });
      }
    }

    if (data.longitude) {
      const result = longitudeSchema.safeParse(data.longitude);

      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          path: ["longitude"],
          message:
            result.error.issues[0]?.message ?? "Please enter a valid longitude",
        });
      }
    }
  },
).strict();

export const LocationUpdateSchema = LocationFieldsSchema.partial();

export type LocationFormValues = z.input<typeof LocationFieldsSchema>;
export type LocationCreateInput = z.input<typeof LocationCreateSchema>;
export type LocationUpdateInput = z.input<typeof LocationUpdateSchema>;
