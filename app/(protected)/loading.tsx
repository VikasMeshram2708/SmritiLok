import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-screen bg-background/30 flex flex-col items-center justify-center">
      <Loader2 className="text-2xl animate-spin size-10" />;
      <span>Loading Your Journeys...</span>
    </div>
  );
}
