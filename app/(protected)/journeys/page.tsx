/**
 * This component returns all the journeys of the user
 */

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import JourneyWrapper from "@/components/journeys/actions/journey-wrapper";

// Static params function
export async function generateStaticParams() {
  const user = await currentUser();
  const journeys = await prisma.journey.findMany({
    where: {
      User: {
        email: user?.primaryEmailAddress?.emailAddress ?? "",
      },
    },
    take: 10,
  });

  return journeys?.map((journey) => ({
    id: journey?.id,
  }));
}

export default async function JourneysPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  const journeyCount = await prisma.journey.count({
    where: {
      User: {
        email,
      },
    },
  });
  const journeys = await prisma.journey.findMany({
    where: {
      User: {
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
          <h2 className="text-2xl font-semibold">My Journeys</h2>
          <p className="text-gray-500 text-sm">
            Explore your past adventures and plan new ones.
          </p>
        </header>

        {/* journey Search bar */}
        <JourneyWrapper journeyCount={journeyCount} allJourneys={journeys} />
      </div>
    </div>
  );
}
