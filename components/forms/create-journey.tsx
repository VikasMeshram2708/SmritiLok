"use client";

import { useRef, useState, useTransition, useOptimistic } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type JourneyEntry = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  notes: string;
  tags: string[];
  mediaPreview?: string;
};

export default function CreateJourney() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Optimistic list of journey entries
  const [optimisticEntries, addOptimisticEntry] = useOptimistic<
    JourneyEntry[],
    JourneyEntry
  >([], (prev, newEntry) => [...prev, newEntry]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    location: "",
    notes: "",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 10) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        setTagInput("");
      }
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setMediaFile(file);
      console.log("Dropped file:", file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      console.log("Selected file:", file);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      location: "",
      notes: "",
    });
    setTags([]);
    setTagInput("");
    setMediaFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const tempId = crypto.randomUUID(); // Temporary ID
    const previewUrl = mediaFile ? URL.createObjectURL(mediaFile) : undefined;

    const optimisticLog: JourneyEntry = {
      id: tempId,
      ...formData,
      tags,
      mediaPreview: previewUrl,
    };

    // Move optimistic update inside startTransition
    startTransition(async () => {
      // Add optimistic update inside transition
      addOptimisticEntry(optimisticLog);

      try {
        // Simulate or perform actual API call here
        console.log("Submitted data:", {
          ...formData,
          tags,
          mediaFile,
        });

        // Optionally handle response and update optimistic state here
      } catch (error) {
        alert("Failed to save journey: " + (error as Error).message);
        // Optionally rollback optimistic update here
      } finally {
        resetForm();
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Exploring the Eiffel Tower"
            className="bg-muted/50 rounded px-4 py-2 max-w-lg w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="A beautiful day walking around the Champs-Élysées..."
            className="bg-muted/50 rounded p-5 max-w-lg w-full"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-muted/50 rounded p-2 max-w-lg w-full"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Paris, France"
            className="bg-muted/50 rounded px-4 py-2 max-w-lg w-full"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Tags <span className="text-gray-500">(press space to add)</span>
          </label>
          <input
            type="text"
            className="bg-muted/50 rounded px-4 py-2 max-w-lg w-full"
            placeholder="romantic travel beach"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-muted-foreground text-xs rounded-full flex items-center space-x-1 text-white"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium text-sm mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Saw an amazing street performance at Times Square."
            rows={4}
            className="bg-muted/50 rounded p-5 max-w-lg w-full"
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className="block font-medium text-sm mb-1">Media File</label>
          <div
            onClick={openFilePicker}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer bg-muted/30",
              isDragging ? "border-primary bg-muted/40" : "border-muted"
            )}
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag & drop your image here or{" "}
              <span className="underline">browse</span>
            </p>
            {mediaFile && (
              <p className="text-xs text-muted-foreground mt-2">
                Selected: {mediaFile.name}
              </p>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Show selected media file preview */}
        {mediaFile && (
          <Image
            src={URL.createObjectURL(mediaFile)}
            alt={formData.title}
            width={300}
            height={150}
            className="w-auto h-auto rounded object-cover mt-4"
          />
        )}

        {/* Submit */}
        <div>
          <Button type="submit" size={"lg"} disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {/* Optimistic Entries Preview */}
      {optimisticEntries.length > 0 && (
        <section className="mt-12 max-w-xl mx-auto space-y-6">
          <h2 className="text-xl font-semibold">Your Recent Journey Logs</h2>
          {optimisticEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
            >
              <h3 className="font-semibold text-lg">{entry.title}</h3>
              <p className="text-sm text-muted-foreground">
                {entry.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {entry.date} — {entry.location}
              </p>
              {entry.mediaPreview && (
                <Image
                  src={entry.mediaPreview}
                  alt={entry.title}
                  width={300}
                  height={150}
                  className="rounded mt-2 object-cover"
                />
              )}
              {entry.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-muted-foreground text-xs rounded-full text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {entry.notes && (
                <p className="mt-2 text-sm italic text-muted-foreground">
                  Notes: {entry.notes}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </>
  );
}
