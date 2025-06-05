/**
 * This is api to delete new journey logs.
 */
"use server";

import { rateLimit } from "@/lib/limiter";
import prisma from "@/lib/prisma";
import { deleteJourneySchema } from "@/models/journey";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import * as z from "zod/v4";

export async function DELETE(req: NextRequest) {
  try {
    // rate limit
    const limitResponse = await rateLimit(req);
    if (limitResponse) return limitResponse;

    // body
    const data = await req.json();

    // validate auth
    const { userId } = await auth();

    // unauthorized error
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // validate schema
    const parsed = deleteJourneySchema.safeParse(data);

    if (!parsed.success) {
      const err = parsed.error ? z.treeifyError(parsed.error) : undefined;

      return new Response(JSON.stringify({ success: false, message: err }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    const { journeyId } = parsed.data;

    // delete the journey log
    await prisma.journey.delete({
      where: {
        id: journeyId,
      },
    });

    // revalidate the path
    revalidatePath("/journeys");

    // return the response
    return new Response(
      JSON.stringify({
        success: false,
        message: "Journey Deleted",
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
