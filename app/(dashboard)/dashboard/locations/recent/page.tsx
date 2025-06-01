import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  searchParams: {
    page?: string;
  };
};

const PAGE_SIZE = 6;

export default async function RecentPage({ searchParams }: Props) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const page = parseInt(searchParams.page ?? "1");
  const skip = (page - 1) * PAGE_SIZE;

  const total = await prisma.journey.count({
    where: { user: { email } },
  });

  const journeys = await prisma.journey.findMany({
    where: { user: { email } },
    take: PAGE_SIZE,
    skip,
    orderBy: { visitedAt: "desc" },
  });

  const hasNextPage = total > page * PAGE_SIZE;
  const hasPrevPage = page > 1;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Recent Journeys</h1>

      {journeys.length < 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Journeys Yet</CardTitle>
            <CardDescription>
              You {"haven’t"} logged any journeys. Explore the map and save your
              first adventure.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <Suspense fallback={<Skeleton className="h-8 w-48" />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {journeys.map((journey) => (
                <Card
                  key={journey.id}
                  className="transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    <CardDescription>{journey?.name}</CardDescription>
                    <CardTitle className="text-lg">
                      {journey.displayName || journey.city || "Unnamed Place"}
                    </CardTitle>
                    <Badge>
                      {format(new Date(journey.visitedAt), "dd MMM yyyy")}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {journey.notes && (
                        <>
                          <Separator />
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {journey.notes}
                          </p>
                        </>
                      )}
                      {journey.tags && journey.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {journey.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-6">
            <Button asChild variant="secondary" disabled={!hasPrevPage}>
              <Link href={`/dashboard/locations/recent?page=${page - 1}`}>
                ← Back
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">Page {page}</span>
            <Button asChild disabled={!hasNextPage}>
              <Link href={`/dashboard/locations/recent?page=${page + 1}`}>
                Next →
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
