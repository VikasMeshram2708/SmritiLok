/**
 * This component returns all the journeys of the user
 */

import MemoryWrapper from "@/components/memories/actions/memory-wrapper";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// Static params function
export async function generateStaticParams() {
  const user = await currentUser();
  const memories = await prisma.memory.findMany({
    where: {
      user: {
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      },
    },
    take: 10,
  });

  return memories?.map((memory) => ({
    id: memory?.id,
  }));
}

export default async function JourneysPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  const journeyCount = await prisma.memory.count({
    where: {
      user: {
        email,
      },
    },
  });
  const journeys = await prisma.memory.findMany({
    where: {
      user: {
        email,
      },
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* journey header */}
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold">My Memories</h2>
          <p className="text-gray-500 text-sm">
            Explore your past adventures and plan new ones.
          </p>
        </header>

        {/* journey Search bar */}
        <MemoryWrapper journeyCount={journeyCount} allJourneys={journeys} />
      </div>
    </div>
  );
}
