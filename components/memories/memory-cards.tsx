/**
 * This component holds all the memory cards
 */

import Image from "next/image";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { EllipsisVertical, Loader2, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Suspense } from "react";
import { Button } from "../ui/button";
import DeleteMemory from "./delete-memory";

export default function MemoryCards({ data }: { data: MemoryResponse[] }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center gap-2">
          <Loader2 />
          <p>Loading...</p>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((memory) => (
          <Card
            className="bg-transparent border-none outline-none p-0"
            key={memory?.id}
          >
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={memory?.media ?? "https://picsum.photos/800/600"}
                  alt="memory title"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="rounded-md object-contain bg-secondary hover:scale-105 hover:transition ease-in duration-300 hover:cursor-pointer"
                />
              </div>
            </CardContent>
            <CardHeader className="p-0 bg-none -mt-2">
              <CardTitle className="capitalize cursor-pointer hover:underline hover:underline-offset-4 leading-relaxed line-clamp-2 font-semibold">
                <Link href={`/memories/${memory?.id}`}>
                  {memory.title ?? memory?.description}
                </Link>
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString("en-IN", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </CardDescription>
              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {/* <DropdownMenuItem>
                      <Button variant={"ghost"}>
                        <Share2 />
                        Share
                      </Button>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem>
                      <Button variant={"ghost"}>
                        <SquarePen />
                        Edit
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      {/* Delete button */}
                      <DeleteMemory memoryId={encodeURIComponent(memory?.id)} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Suspense>
  );
}
