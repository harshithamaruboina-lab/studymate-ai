// app/dashboard/page.tsx
import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import TopNavbar from "@/components/dashboard/TopNavbar";
import StatsCards from "@/components/dashboard/StatsCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentSessions from "@/components/dashboard/RecentSessions";
import AIRecommendations from "@/components/dashboard/AIRecommendations";

export const metadata: Metadata = {
  title: "Dashboard | StudyMateAI",
  description: "Your personalized AI study and interview coaching dashboard.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#05050a]">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <TopNavbar />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <StatsCards />
            <QuickActions />
            <RecentSessions />
            <AIRecommendations />
          </div>
        </main>
      </div>
    </div>
  );
}