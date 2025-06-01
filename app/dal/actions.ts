/**
 * This components has sever actions for saving the journey logs
 */
"use server";

import prisma from "@/lib/prisma";
import { newJourneySchema, NewJourneySchema } from "@/models/location";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function saveJourney(data: NewJourneySchema) {
  try {
    // Auth check
    const { userId } = await auth();
    const authUser = await currentUser();
    if (!userId) {
      throw new Error("Unauthorized");
    }
    // sanitize incoming data
    const parsed = newJourneySchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.flatten().fieldErrors,
      };
    }
    // save the user if not exist
    const userExist = await prisma.user.findUnique({
      where: {
        email: authUser?.primaryEmailAddress?.emailAddress ?? "",
      },
    });

    if (!userExist) {
      // save the new user
      await prisma.user.create({
        data: {
          name: authUser?.fullName ?? "",
          email: authUser?.primaryEmailAddress?.emailAddress ?? "",
          picture: authUser?.imageUrl,
        },
      });
    }
    // if the user exist update the lastLogin
    await prisma.user.update({
      where: {
        email: authUser?.primaryEmailAddress?.emailAddress ?? "",
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    });
    const {
      country,
      countryCode,
      latitude,
      longitude,
      name,
      state,
      visitedAt,
      city,
      displayName,
      notes,
      region,
      tags,
      type,
      village,
    } = parsed.data;
    // save the journey data
    await prisma.journey.create({
      data: {
        village,
        country,
        countryCode,
        latitude,
        longitude,
        name,
        state,
        visitedAt: new Date(visitedAt),
        city,
        displayName,
        notes,
        photoUrls: [],
        region,
        tags: tags,
        type,
        user: {
          connect: {
            email: authUser?.primaryEmailAddress?.emailAddress ?? "",
          },
        },
      },
    });
    // return the response

    return {
      success: true,
      message: "Saved",
    };
  } catch (e) {
    const err =
      (e as Error).message ?? "Something went wrong. Please try again.";
    console.log(err);
    return {
      success: false,
      message: err,
    };
  }
}
