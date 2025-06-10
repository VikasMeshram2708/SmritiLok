"use client";
import { Search, Loader2 } from "lucide-react";
import React, { Suspense, useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { useDebounce } from "@/lib/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import MemoryCards from "../memory-cards";

export default function MemoryWrapper({
  journeyCount,
  allJourneys,
}: {
  journeyCount: number;
  allJourneys: MemoryResponse[];
}) {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);
  const [results, setResults] = useState<MemoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Update URL params when debouncedText changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedText.trim()) {
      params.set("q", debouncedText.trim());
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  useEffect(() => {
    async function handleJourneySearch() {
      setLoading(true);
      setNoResults(false);
      try {
        const response = await fetch("/api/memory/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: decodeURIComponent(debouncedText) }),
        });
        const json = await response.json();
        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setResults(json.data);
          setNoResults(false);
        } else {
          setResults([]);
          setNoResults(true);
        }
      } catch (e) {
        console.log(e);
        setResults([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    }

    if (debouncedText.trim()) {
      handleJourneySearch();
    } else {
      setResults([]);
      setNoResults(false);
    }
  }, [debouncedText]);

  return (
    <>
      <div className="space-y-6 relative flex-1">
        {/* Search Bar */}
        <div className="text-muted-foreground bg-muted/30 px-4 py-2 rounded-sm relative flex-1">
          <Search
            className="absolute text-sm left-8 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            size={18}
          />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Search memories"
            className="pl-10 text-muted-foreground"
            aria-label="Search journeys"
            autoComplete="off"
          />
          {loading && (
            <Loader2
              className="absolute right-8 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground"
              size={18}
            />
          )}
        </div>
      </div>

      {journeyCount === 0 ? (
        <div className="text-center mt-4">
          <p className="text-sm font-semibold">
            You {"haven't"} added any memories yet.
          </p>
          <p className="text-sm text-muted-foreground">
            Click the <span className="font-medium">{"New Memory"}</span> button
            above to start documenting your memories.
          </p>
        </div>
      ) : noResults && debouncedText.trim() ? (
        <p className="text-sm text-muted-foreground mt-4">No memories found.</p>
      ) : (
        <Suspense fallback={<Loader2 className="animate-spin" />}>
          <MemoryCards data={debouncedText.trim() ? results : allJourneys} />
        </Suspense>
      )}
    </>
  );
}
