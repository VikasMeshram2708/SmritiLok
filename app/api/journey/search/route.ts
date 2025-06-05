/**
 * This API searches user-specific journeys.
 */

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body;
    console.log("inc", query);

    if (!query) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing or empty 'query' parameter.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    // Search journeys with case-insensitive partial match in title or description
    const journeys = await prisma.journey.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 5, // Limit results for performance
      orderBy: { createdAt: "desc" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: journeys,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
        message:
          (e as Error)?.message ?? "Something went wrong. Please try again.",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}
