"use client";

import { Plus, X } from "lucide-react";
import { SidebarGroupAction } from "../ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { newLocationSchema, NewLocationSchema } from "@/models/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

export default function AppSidebarBtn() {
  const form = useForm<NewLocationSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(newLocationSchema),
  });

  async function onSubmit(data: NewLocationSchema) {
    console.log("data", data);
  }
  return (
    <>
      {/* Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <SidebarGroupAction
            className="cursor-pointer -mt-2"
            title="Add Location"
          >
            <Plus className="w-4 h-4" />{" "}
            <span className="sr-only">Add Location</span>
          </SidebarGroupAction>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New Location</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Search Location" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <ul className="bg-muted space-y-2">
            {Array.from({ length: 6 }).map((_, ctx) => (
              <li
                key={ctx}
                className="p-2 text-xs hover:bg-muted-foreground hover:text-muted text-muted-foreground"
              >
                New Gondia, 441614
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
