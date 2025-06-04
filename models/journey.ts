import * as z from "zod";

// Production-grade journey schema
export const journeySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { message: "Title is required" })
      .max(100, { message: "Title must be at most 100 characters" }),
    description: z
      .string()
      .trim()
      .max(500, { message: "Description must be at most 500 characters" })
      .optional(),
    date: z
      .string({
        required_error: "Date is required",
        invalid_type_error: "Invalid date format",
      })
      .min(1, { message: "Date is required" }),
    location: z
      .string()
      .trim()
      .min(1, { message: "Location is required" })
      .max(800, { message: "Location must be at most 800 characters" }),
    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1, { message: "Tag cannot be empty" })
          .max(50, { message: "Tag must be at most 50 characters" })
      )
      .max(10, { message: "At most 10 tags allowed" })
      .optional(),
    mediaFile: z.enum(["IMAGE", "VIDEO"]).optional(),
    notes: z
      .string()
      .trim()
      .max(500, { message: "Notes must be at most 500 characters" })
      .optional(),
  })
  .strict();

export type JourneySchema = z.infer<typeof journeySchema>;
