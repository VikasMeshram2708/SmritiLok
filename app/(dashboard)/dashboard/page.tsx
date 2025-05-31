import { AppChart } from "@/components/dashboard/app-chart";
import CardsSection from "@/components/dashboard/cards-section";

export default function DashboardPage() {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <CardsSection />
        <AppChart />
      </div>
    </div>
  );
}
