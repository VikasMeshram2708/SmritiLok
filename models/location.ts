/**
 * Schemas of locations
 */

import * as z from "zod";

export const newLocationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type NewLocationSchema = z.infer<typeof newLocationSchema>;
