/**
 * This component returns all the journeys of the user
 */

import JourneyCards from "@/components/journeys/journey-cards";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Search } from "lucide-react";

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
        <div className="text-muted-foreground bg-muted/30 px-4 py-2 rounded-sm relative flex-1">
          <Search
            className="absolute text-sm left-8 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search journeys"
            className="pl-10 text-muted-foreground"
          />
        </div>
        {/* filter buttons */}
        <div className="flex items-center gap-4">
          <Select>
            <SelectTrigger className="w-[90px] bg-muted/40 rounded-sm">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Date */}
          <Select>
            <SelectTrigger className="w-[110px] bg-muted/40 rounded-sm">
              <SelectValue placeholder="Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Sort */}
          <Select>
            <SelectTrigger className="w-[90px] bg-muted/40 rounded-sm">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Journey Cards Section */}
        {journeyCount > 0 ? (
          <JourneyCards journeys={journeys} />
        ) : (
          <p className="text-sm font-semibold">
            You haven't created any journeys yet. Click the "New Journey" button
            above to start documenting your adventures.
          </p>
        )}
      </div>
    </div>
  );
}
