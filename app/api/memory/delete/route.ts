/**
 * This is api to delete new journey logs.
 */
"use server";

import { rateLimit } from "@/lib/limiter";
import prisma from "@/lib/prisma";
import { deleteMemorySchema } from "@/models/memory";
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
    const parsed = deleteMemorySchema.safeParse(data);

    if (!parsed.success) {
      const err = parsed.error ? z.treeifyError(parsed.error) : undefined;

      return new Response(JSON.stringify({ success: false, message: err }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      });
    }

    const { memoryId } = parsed.data;
    // console.log("incd-mid", memoryId);

    // delete the journey log
    await prisma.memory.delete({
      where: {
        id: memoryId,
      },
    });

    // revalidate the path
    revalidatePath("/memories");

    // return the response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Memory Deleted",
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
