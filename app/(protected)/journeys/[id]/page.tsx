import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type JourneyDetailPageParams = {
  params: Promise<{ id: string }>;
};
export default async function JourneyDetailPage({
  params,
}: JourneyDetailPageParams) {
  const { id } = await params;
  console.log("id", id);
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Button variant={"ghost"}>
          <Link className="flex items-center gap-1" href="/journeys">
            <ChevronLeft />
            Back
          </Link>
        </Button>
        {/* header section */}
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold">Journey to the Manali</h2>
          <p className="text-sm text-muted-foreground">
            {new Date("2025-06-04").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            {/* country */}
            India,
            {/* tags */}
            #nature, #adventure, #culture
          </p>
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
        <article>
          <h2 className="text-2xl font-semibold">Notes</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit
            aliquam quia, tempore aliquid quaerat ullam commodi qui hic,
            consequuntur minus eveniet optio blanditiis. At est quaerat soluta
            magni ipsam impedit dolor omnis dolores quos fuga. Voluptatum
            tenetur exercitationem neque rem inventore et placeat minus, nihil
            obcaecati nulla nam similique? Rerum quibusdam autem quam dolore
            placeat dicta numquam nostrum reprehenderit? Ex, consequatur veniam
            ab labore tempora, iste nemo deserunt quaerat provident omnis
            mollitia fugiat non assumenda, excepturi et expedita suscipit
            asperiores? Est temporibus enim explicabo commodi, ipsa facilis! Hic
            soluta quasi similique eos at, veritatis ab totam exercitationem
            odio adipisci eum.
          </p>
        </article>
      </div>
    </div>
  );
}
