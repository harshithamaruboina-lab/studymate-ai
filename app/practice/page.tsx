// app/practice/page.tsx
import type { Metadata } from "next";
import PracticeLayout from "@/components/practice/PracticeLayout";

export const metadata: Metadata = {
  title: "Practice | StudyMateAI",
  description: "Practice with AI-generated questions tailored to your topic.",
};

export default function PracticePage() {
  return (
    <div className="min-h-screen bg-[#05050a]">
      <PracticeLayout />
    </div>
  );
}