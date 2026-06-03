import DashboardLayout from "@/components/layout/DashboardLayout";
import CapabilityMapSection from "@/components/sections/CapabilityMapSection";

export default function CapabilitiesPage() {
  return (
    <DashboardLayout
      title="Capability Map"
      description="Microsoft technology portfolio for victim support"
    >
      <CapabilityMapSection />
    </DashboardLayout>
  );
}
