import DashboardLayout from "@/components/layout/DashboardLayout";
import DecisionTreeSection from "@/components/sections/DecisionTreeSection";

export default function DecisionTreePage() {
  return (
    <DashboardLayout
      title="Decision Framework"
      description="Microsoft AI Decision Framework — choose the right capability"
    >
      <DecisionTreeSection />
    </DashboardLayout>
  );
}
