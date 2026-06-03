import DashboardLayout from "@/components/layout/DashboardLayout";
import DemoJourneySection from "@/components/sections/DemoJourneySection";

export default function DemoPage() {
  return (
    <DashboardLayout
      title="Workshop Demo Journey"
      description="Step-by-step technical demonstration plan"
    >
      <DemoJourneySection />
    </DashboardLayout>
  );
}
