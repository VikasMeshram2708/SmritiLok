import CreateJourney from "@/components/forms/create-journey";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewJourneyPage() {
  return (
    <div className="bg-background min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/journeys" className="flex items-center gap-1">
            <ChevronLeft />
            Back
          </Link>
        </Button>

        <h2 className="text-2xl font-bold">Log Your Journey</h2>

        {/* create journey form */}
        <CreateJourney />
      </div>
    </div>
  );
}
