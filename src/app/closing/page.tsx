import DashboardLayout from "@/components/layout/DashboardLayout";
import ClosingSection from "@/components/sections/ClosingSection";

export default function ClosingPage() {
  return (
    <DashboardLayout
      title="Executive Summary"
      description="The transformation path forward"
    >
      <ClosingSection />
    </DashboardLayout>
  );
}
