"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { CheckCircle, Loader2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils"; // optional: for className merging

const MediaUpload = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const { signature, expire, token, publicKey } = await response.json();
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      setErrorMessage("Failed to authenticate for upload.");
      return;
    }

    const { signature, expire, token, publicKey } = authParams;
    setStatus("uploading");
    setProgress(0);
    setErrorMessage("");

    try {
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        folder: "smritiLok",
        expire,
        token,
        signature,
        publicKey,
        onProgress: (event) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
        },
        abortSignal: abortController.signal,
      });

      console.log("Upload response:", uploadResponse);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      if (error instanceof ImageKitAbortError) {
        setErrorMessage("Upload aborted.");
      } else if (error instanceof ImageKitInvalidRequestError) {
        setErrorMessage("Invalid request: " + error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        setErrorMessage("Network error: " + error.message);
      } else if (error instanceof ImageKitServerError) {
        setErrorMessage("Server error: " + error.message);
      } else {
        setErrorMessage("Upload failed: " + (error as Error).message);
      }
    }
  };

  return (
    <div className="max-w-md w-full mx-auto mt-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Media</h2>

      <input
        type="file"
        ref={fileInputRef}
        className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 p-2"
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={status === "uploading"}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-white transition",
          status === "uploading"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        {status === "uploading" ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <UploadCloud className="w-4 h-4" />
        )}
        {status === "uploading" ? "Uploading..." : "Upload File"}
      </button>

      {status === "uploading" && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-1 text-gray-600 text-center">{progress}%</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-center justify-center text-green-600 mt-4 gap-1">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">Upload successful!</span>
        </div>
      )}

      {status === "error" && (
        <div className="text-red-500 mt-4 text-sm text-center">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
