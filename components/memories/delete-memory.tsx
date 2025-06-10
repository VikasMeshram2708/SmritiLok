"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, Trash2Icon, X } from "lucide-react";
import { useRef, useTransition } from "react";

export default function DeleteMemory({ memoryId }: { memoryId: string }) {
  // close ref
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isPending, startTransition] = useTransition();
  async function handleDelete() {
    startTransition(async () => {
      try {
        if (!memoryId) return;
        // api req
        const response = await fetch("/api/memory/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ memoryId }),
        });
        const json = await response.json();
        console.log("json", json);
        alert(json?.message ?? "Journey Deleted");
        closeBtnRef.current?.click();
      } catch (e) {
        console.log(e);
        alert(
          (e as Error)?.message ?? "Something went wrong. Please try again."
        );
      }
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="w-full">
          <Trash2Icon />
          {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium">
            Are you sure you want to delete this journey log? This action cannot
            be undone.
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-end gap-4">
          <Button
            onClick={handleDelete}
            type="button"
            size="sm"
            disabled={isPending}
          >
            <Trash2Icon />
            {isPending ? <Loader2 className="animate-spin" /> : "Confirm"}
          </Button>
          <DialogClose ref={closeBtnRef} asChild>
            <Button variant="destructive" className="flex items-center">
              <X />
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
