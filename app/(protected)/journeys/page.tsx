/**
 * @returns This component returns all the journeys of the user
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import Image from "next/image";

export default function JourneysPage() {
  return (
    <div className="bg-background min-h-screen py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Search bar */}
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
            <SelectTrigger className="w-[100px] bg-muted/40 rounded-sm">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Date */}
          <Select>
            <SelectTrigger className="w-[80px] bg-muted/40 rounded-sm">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          {/* Sort */}
          <Select>
            <SelectTrigger className="w-[80px] bg-muted/40 rounded-sm">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Journey Cards Section */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 7 }).map((_, idx) => (
            <Card
              className="bg-transparent border-none outline-none p-0"
              key={idx}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src="https://picsum.photos/800/600"
                    alt="journey title"
                    fill
                    priority
                    className="rounded-md object-cover bg-contain hover:scale-105 hover:transition ease-in duration-300 hover:cursor-pointer"
                  />
                </div>
              </CardContent>
              <CardHeader className="p-0 bg-none -mt-2">
                <CardTitle className="hover:underline hover:underline-offset-4 leading-relaxed line-clamp-2 font-semibold">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facilis, minus?
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </ul>
      </div>
    </div>
  );
}
