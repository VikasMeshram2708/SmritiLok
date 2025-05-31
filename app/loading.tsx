import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-screen bg-background/20 flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold">
        <Loader2 className="size-20" />
        <span>Loading...</span>
      </p>
    </div>
  );
}
