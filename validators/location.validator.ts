import * as z from "zod";

export const LocationCreateSchema = z
  .object({
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    country: z
      .string()
      .trim()
      .max(100, "Country must be at most 100 characters"),
    division: z
      .string()
      .trim()
      .max(100, "Division must be at most 100 characters"),
    city: z.string().trim().max(100, "City must be at most 100 characters"),
    village: z
      .string()
      .trim()
      .max(100, "Village must be at most 100 characters"),
    postalCode: z
      .string()
      .trim()
      .max(20, "Postal code must be at most 20 characters"),
    addressLine: z
      .string()
      .trim()
      .max(255, "Address must be at most 255 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Country
    if (!data.country) {
      ctx.addIssue({
        code: "custom",
        path: ["country"],
        message: "Please enter your country",
      });
    }
    // Division
    if (!data.division) {
      ctx.addIssue({
        code: "custom",
        path: ["division"],
        message: "Please enter your division",
      });
    }
    // City
    if (!data.city) {
      ctx.addIssue({
        code: "custom",
        path: ["city"],
        message: "Please enter your city",
      });
    }
    // Village
    if (!data.village) {
      ctx.addIssue({
        code: "custom",
        path: ["village"],
        message: "Please enter your village or area",
      });
    }
    // Postal code
    if (!data.postalCode) {
      ctx.addIssue({
        code: "custom",
        path: ["postalCode"],
        message: "Please enter your postal code",
      });
    }
    // Latitude
    if (
      data.latitude &&
      !z
        .string()
        .regex(/^-?\\d+(\\.\\d+)?$/)
        .safeParse(data.latitude).success
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["latitude"],
        message: "Please enter a valid latitude",
      });
    } else if (
      data.latitude &&
      (Number(data.latitude) < -90 || Number(data.latitude) > 90)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["latitude"],
        message: "Latitude must be between -90 and 90",
      });
    }
    // Longitude
    if (
      data.longitude &&
      !z
        .string()
        .regex(/^-?\\d+(\\.\\d+)?$/)
        .safeParse(data.longitude).success
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["longitude"],
        message: "Please enter a valid longitude",
      });
    } else if (
      data.longitude &&
      (Number(data.longitude) < -180 || Number(data.longitude) > 180)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["longitude"],
        message: "Longitude must be between -180 and 180",
      });
    }
  })
  .strict();

export const LocationUpdateSchema = LocationCreateSchema.partial();
export type LocationCreateInput = z.input<typeof LocationCreateSchema>;
export type LocationUpdateInput = z.input<typeof LocationUpdateSchema>;
