/**
 * Schemas of locations
 */

import * as z from "zod";

export const newLocationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type NewLocationSchema = z.infer<typeof newLocationSchema>;

// Journey schema
export const newJourneySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  displayName: z.string().optional(),
  latitude: z.string().min(1, { message: "Latitude is required" }),
  longitude: z.string().min(1, { message: "Longitude is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  countryCode: z.string().min(1, { message: "Country Code is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().optional(),
  type: z.string().optional(),
  notes: z.string().optional(),
  tags: z.array(z.string()),
  photoUrls: z.string().optional(),
  visitedAt: z.string().min(1, { message: "Visited Date is required" }),
});

export type NewJourneySchema = z.infer<typeof newJourneySchema>;
