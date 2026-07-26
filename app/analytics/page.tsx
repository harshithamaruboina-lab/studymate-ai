// app/analytics/page.tsx
import type { Metadata } from "next";
import AnalyticsLayout from "@/components/analytics/AnalyticsLayout";

export const metadata: Metadata = {
  title: "Analytics | StudyMateAI",
  description: "Track your performance trends, topic mastery, and study streaks.",
};

export default function AnalyticsPage() {
  return <AnalyticsLayout />;
}