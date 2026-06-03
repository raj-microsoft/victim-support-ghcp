import DashboardLayout from "@/components/layout/DashboardLayout";
import UseCaseSection from "@/components/sections/UseCaseSection";

export default function UseCasePage() {
  return (
    <DashboardLayout
      title="360° Use Case Journey"
      description="A complete victim support scenario across the Microsoft stack"
    >
      <UseCaseSection />
    </DashboardLayout>
  );
}
