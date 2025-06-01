import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <p>
        <Loader2 className="animate-spin size-10" />
      </p>
    </div>
  );
}
