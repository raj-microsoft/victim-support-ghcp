import DashboardLayout from "@/components/layout/DashboardLayout";
import HeroSection from "@/components/sections/HeroSection";

export default function HomePage() {
  return (
    <DashboardLayout
      title="Workshop Overview"
      description="One Microsoft ecosystem for modern victim support"
    >
      <HeroSection />
    </DashboardLayout>
  );
}
