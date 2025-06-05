import JourneyShareBtn from "@/components/journeys/journey-share-btn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { ChevronLeft, Dot, Loader2 } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type JourneyDetailPageParams = {
  params: Promise<{ id: string }>;
};

// generate metadata
export async function generateMetadata({
  params,
}: JourneyDetailPageParams): Promise<Metadata> {
  const { id } = await params;
  const journey = await prisma.journey.findUnique({
    where: {
      id: decodeURIComponent(id) ?? "",
    },
  });

  return {
    title: journey?.title ?? "Title",
    description: journey?.description ?? "Description",
    openGraph: {
      title: journey?.title ?? "Title",
      description: journey?.description ?? "Description",
      // TODO: Add images
    },
  };
}
export default async function JourneyDetailPage({
  params,
}: JourneyDetailPageParams) {
  const { id } = await params;
  const journey = await prisma.journey.findUnique({
    where: {
      id: decodeURIComponent(id),
    },
  });

  if (!id) notFound();
  if (!journey) notFound();
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Button variant={"ghost"}>
          <Link className="flex items-center gap-1" href="/journeys">
            <ChevronLeft />
            Back
          </Link>
        </Button>
        <Suspense
          fallback={
            <div className="flex items-center gap-2">
              <p>
                <Loader2 className="animate-spin" />
              </p>
              <p>Loading...</p>
            </div>
          }
        >
          {/* header section */}
          <header className="space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
                Journey to the {journey?.title}
              </h2>
              {/* Share button */}
              <JourneyShareBtn />
            </div>
            <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center flex-wrap gap-2">
                <p>
                  {new Date("2025-06-04").toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </p>
                {/* country */}
                <p className="flex items-center">
                  <Dot />
                  {/* could be country name */}
                  <span>{journey?.location}</span>
                </p>
              </div>
              {/* tags */}
              <ul className="flex flex-wrap items-center gap-2">
                {journey?.tags?.map((tag, idx) => (
                  <li
                    key={idx}
                    className="lowercase font-bold flex items-center"
                  >
                    #{tag}
                    {idx < journey.tags.length - 1 && <span>,</span>}
                  </li>
                ))}
              </ul>
            </div>
          </header>
          {/* images section */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Card key={idx} className="p-0">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src="https://picsum.photos/800/600"
                      alt="manali"
                      fill
                      sizes="100vw"
                      priority
                      className="rounded-lg w-auto h-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
          {/* notes section */}
          {journey?.notes && (
            <article>
              <h2 className="text-2xl font-semibold">Notes</h2>
              <p className="text-sm text-muted-foreground">{journey?.notes}</p>
            </article>
          )}
        </Suspense>
      </div>
    </div>
  );
}
