"use client";

import { Button } from "@/components/ui/button";
import { UploadCloud, X, Image, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { authenticator } from "@/lib/authenticator";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

export default function CreateJourney() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<JourneySchema>();

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Set media type based on file type
    const mediaType = file.type.startsWith("image/") ? "IMAGE" : "VIDEO";
    setValue("mediaType", mediaType);
    setValue("media", file.name);
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (
      files.length > 0 &&
      (files[0].type.startsWith("image/") || files[0].type.startsWith("video/"))
    ) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag) && tags.length < 10) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        setValue("tags", newTags);
        setTagInput("");
      }
    }
  };

  // Remove tag
  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setValue("media", "");
    setValue("mediaType", undefined);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Abort any ongoing upload
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const onSubmit: SubmitHandler<JourneySchema> = async (data) => {
    if (!selectedFile) {
      alert("Please select a media file");
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Get ImageKit authentication parameters
      const authParams = await authenticator();
      const { signature, expire, token, publicKey } = authParams;

      // Upload to ImageKit
      const uploadResponse = await upload({
        file: selectedFile,
        fileName: selectedFile.name,
        folder: "smritiLok",
        expire,
        token,
        signature,
        publicKey,
        onProgress: (event) => {
          const progressPercent = (event.loaded / event.total) * 100;
          setProgress(progressPercent);
        },
        abortSignal: abortControllerRef.current.signal,
      });

      if (!uploadResponse.url) {
        throw new Error("ImageKit upload failed");
      }

      // Now include the uploaded media URL in the form submission
      const response = await fetch("/api/journey/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          media: uploadResponse.url,
          mediaType: selectedFile.type.startsWith("image/") ? "IMAGE" : "VIDEO",
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save journey data to the server.");
      }

      alert("Journey created successfully!");
      handleReset();
      // redirect to journeys page
    } catch (error) {
      console.error("Upload error:", error);

      if (error instanceof ImageKitAbortError) {
        alert("Upload was cancelled");
      } else if (error instanceof ImageKitInvalidRequestError) {
        alert("Invalid upload request: " + error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        alert("Network error during upload: " + error.message);
      } else if (error instanceof ImageKitServerError) {
        alert("Server error during upload: " + error.message);
      } else {
        alert("Upload failed. Please try again.");
      }
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    reset();
    setSelectedFile(null);
    setPreview(null);
    setTags([]);
    setTagInput("");
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Abort any ongoing upload
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Journey</h1>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Exploring the Eiffel Tower"
            className="bg-muted/50 rounded px-4 py-2 max-w-lg w-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isUploading}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-sm mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="A beautiful day walking around the Champs-Élysées..."
            className="bg-muted/50 rounded p-4 max-w-lg w-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
            rows={3}
            disabled={isUploading}
          />
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            {...register("date", { required: "Date is required" })}
            type="date"
            className="bg-muted/50 rounded p-2 max-w-lg w-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isUploading}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="Paris, France"
            className="bg-muted/50 rounded px-4 py-2 max-w-lg w-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={800}
            disabled={isUploading}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Tags <span className="text-gray-500">(press space to add)</span>
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="bg-muted/50 rounded px-4 py-2 max-w-lg w-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="romantic travel beach"
              maxLength={50}
              disabled={isUploading}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                      disabled={isUploading}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block font-medium text-sm mb-1">Notes</label>
          <textarea
            {...register("notes")}
            placeholder="Saw an amazing street performance at Times Square."
            rows={4}
            className="bg-muted/50 rounded p-4 max-w-lg w-full border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
            disabled={isUploading}
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className="block font-medium text-sm mb-1">
            Media File <span className="text-red-500">*</span>
          </label>

          {!selectedFile ? (
            <div
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50",
                "border-muted hover:border-blue-300",
                isUploading && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              role="button"
              tabIndex={0}
              aria-label="Media upload area"
            >
              <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Drag & drop your image or video here or{" "}
                <span className="underline text-blue-600">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports images and videos
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {selectedFile.type.startsWith("image/") ? (
                    <Image className="w-5 h-5 text-green-600" />
                  ) : (
                    <Video className="w-5 h-5 text-green-600" />
                  )}
                  <span className="text-sm font-medium text-green-800">
                    {selectedFile.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700 p-1"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar */}
              {isUploading && (
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Uploading...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {preview && selectedFile.type.startsWith("image/") && (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-32 object-cover rounded-lg"
                />
              )}

              {preview && selectedFile.type.startsWith("video/") && (
                <video
                  src={preview}
                  className="max-w-full h-32 object-cover rounded-lg"
                  controls
                />
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileInputChange}
            className="hidden"
            aria-label="Select media file"
            disabled={isUploading}
          />
          {errors.media && (
            <p className="text-red-500 text-sm mt-1">Media file is required</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button
            type="button"
            size="lg"
            className="px-8"
            onClick={handleSubmit(onSubmit)}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? "Uploading..." : "Save Journey"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleReset}
            disabled={isUploading}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
