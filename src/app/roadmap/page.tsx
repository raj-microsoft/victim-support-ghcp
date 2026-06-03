import DashboardLayout from "@/components/layout/DashboardLayout";
import RoadmapSection from "@/components/sections/RoadmapSection";

export default function RoadmapPage() {
  return (
    <DashboardLayout
      title="Prioritization Roadmap"
      description="Interactive initiative planning and priority scoring"
    >
      <RoadmapSection />
    </DashboardLayout>
  );
}
