"use client";

import { Button } from "@/components/ui/button";
import { newJourneySchema, NewJourneySchema } from "@/models/location";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useStore } from "@/app/context/store";
import { useEffect, useTransition, useState } from "react";
import { saveJourney } from "@/app/dal/actions";

export default function SaveJourney() {
  const { fetchCoords } = useStore();
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewJourneySchema>({
    defaultValues: {
      name: "",
      displayName: "",
      latitude: "",
      longitude: "",
      city: "",
      village: "",
      country: "",
      countryCode: "",
      region: "",
      state: "",
      type: "",
      tags: [],
      notes: "",
      visitedAt: new Date().toISOString().split("T")[0], // formatted date string
    },
    resolver: zodResolver(newJourneySchema),
  });

  const onSubmit = (data: NewJourneySchema) => {
    startTransition(async () => {
      try {
        const result = await saveJourney(data);
        if (!result.success) {
          alert(result.message ?? "Failed");
          return;
        }
        alert(result?.message ?? "Journey Saved");
        form.reset();
      } catch (e) {
        alert(
          (e as Error).message || "Something went wrong. Please try again."
        );
      }
    });
  };

  useEffect(() => {
    const result = fetchCoords();
    console.log("Fetched coords:", result);

    // Example: Pre-fill form fields with fetched data (if available)
    // form.setValue("latitude", result?.lat ?? "");
    // form.setValue("longitude", result?.lng ?? "");
    // form.setValue("city", result?.city ?? "");
    // etc.
  }, [fetchCoords]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 font-semibold">
          Save
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Save a New Journey Location</SheetTitle>
          <SheetDescription>
            Enter journey location details below.
          </SheetDescription>
        </SheetHeader>
        <div className="p-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name + Display Name */}
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Location name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Display name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Latitude + Longitude */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Latitude" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Longitude" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country + Country Code */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Country" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Country code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Region + State */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Region" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="State" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* City + Village */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Village" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Visited At */}
              <FormField
                control={form.control}
                name="visitedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type + Tags */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Type" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => {
                    const [inputValue, setInputValue] = useState("");

                    const handleKeyDown = (
                      e: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                      if (e.key === " " && inputValue.trim()) {
                        e.preventDefault();
                        const newTag = inputValue.trim();
                        if (!field.value.includes(newTag)) {
                          field.onChange([...field.value, newTag]);
                        }
                        setInputValue("");
                      } else if (e.key === "Backspace" && inputValue === "") {
                        e.preventDefault();
                        field.onChange(field.value.slice(0, -1));
                      }
                    };

                    return (
                      <FormItem>
                        <FormControl>
                          <div>
                            <Input
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              placeholder="Type a tag and press space"
                              className="w-full"
                            />
                            {/* Tags as chips */}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {field.value.map((tag, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1 rounded-full bg-pink-200 px-3 py-1 text-sm text-pink-800"
                                >
                                  <span>{tag}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newTags = field.value.filter(
                                        (_, i) => i !== index
                                      );
                                      field.onChange(newTags);
                                    }}
                                    className="text-pink-800 hover:text-pink-900"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Notes */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Notes"
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Footer Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    "Save Journey"
                  )}
                </Button>
                <SheetClose asChild>
                  <Button variant="outline" type="button">
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </SheetClose>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
