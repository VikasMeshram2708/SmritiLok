"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Check, X } from "lucide-react";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();

  const schema = z.object({
    fullName: z.string().min(2, "Full name is required"),
  });

  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "" },
  });

  // Track which field is in edit mode
  const [editField, setEditField] = useState<null | keyof FormValues>(null);

  useEffect(() => {
    if (isLoaded && user) {
      form.reset({
        fullName: user.fullName ?? "",
      });
    }
  }, [user, isLoaded, form]);

  function onSubmit(data: FormValues) {
    console.log("Updated Settings:", data);
    setEditField(null);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Account Settings</CardTitle>
          <CardDescription>
            Manage your profile and account settings.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem
                    className="relative group"
                    onMouseLeave={() => {
                      if (!form.formState.isSubmitting) setEditField(null);
                    }}
                  >
                    <FormLabel>Full Name</FormLabel>

                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          {...field}
                          readOnly={editField !== "fullName"}
                          className={`transition-colors ${
                            editField === "fullName"
                              ? "bg-white border-blue-600"
                              : "bg-gray-100 cursor-default"
                          }`}
                        />
                      </FormControl>

                      {/* Edit icon / Save / Cancel */}
                      {editField === "fullName" ? (
                        <>
                          <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Check size={16} />
                            Save
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              form.resetField("fullName");
                              setEditField(null);
                            }}
                            className="flex items-center gap-1"
                          >
                            <X size={16} />
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditField("fullName")}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Edit full name"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field - always read-only */}
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <Input
                  value={user?.primaryEmailAddress?.emailAddress ?? ""}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed opacity-70"
                />
              </FormItem>
            </form>
          </Form>
        </CardContent>

        {/* Delete Account */}
        <CardContent className="flex justify-end">
          <Button
            type="button"
            onClick={() => alert("Coming Soon!")}
            variant="destructive"
            className="flex items-center gap-2"
          >
            <Trash2 />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
