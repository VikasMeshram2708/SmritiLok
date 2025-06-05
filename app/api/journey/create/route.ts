/**
 * This is api to create new journey logs.
 */
"use server";

import { rateLimit } from "@/lib/limiter";
import prisma from "@/lib/prisma";
import { journeySchema } from "@/models/journey";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import * as z from "zod/v4";

export async function POST(req: NextRequest) {
  try {
    // rate limit
    const limitResponse = await rateLimit(req);
    if (limitResponse) return limitResponse;

    // body
    const data = await req.json();

    // validate auth
    const { userId } = await auth();
    const authUser = await currentUser();

    // unauthorized error
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // validate schema
    const parsed = journeySchema.safeParse(data);

    if (!parsed.success) {
      const err = parsed.error.flatten().fieldErrors;

      return new Response(JSON.stringify({ success: false, message: err }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    // check user is registered or not
    const userExists = await prisma.user.findUnique({
      where: {
        email: authUser?.primaryEmailAddress?.emailAddress ?? "",
      },
    });

    const {
      title,
      date,
      location,
      description,
      media,
      mediaType,
      notes,
      tags,
    } = parsed.data;

    if (!userExists) {
      // if no then save it
      await prisma.user.create({
        data: {
          email: authUser?.primaryEmailAddress?.emailAddress ?? "",
          name: authUser?.fullName ?? "",
          picture: authUser?.imageUrl ?? "",
        },
      });
    }

    // save the journey log
    await prisma.journey.create({
      data: {
        title,
        date,
        location,
        description,
        media: media ?? null,
        mediaType,
        notes,
        tags,
        User: {
          connect: {
            email: authUser?.primaryEmailAddress?.emailAddress ?? "",
          },
        },
      },
    });

    // revalidate the path
    revalidatePath("/journeys/**");

    // return the response
    return new Response(
      JSON.stringify({
        success: false,
        message: "Journey logged",
        callbackUrl: "/journeys",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
      }
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      const err = z.prettifyError(e);

      return new Response(JSON.stringify({ success: false, message: err }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      });
    }
    return new Response(
      JSON.stringify({
        success: false,

        message:
          (e as Error)?.message ?? "Something went wrong. Please try again.",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
