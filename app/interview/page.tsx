// app/interview/page.tsx
import type { Metadata } from "next";
import InterviewLayout from "@/components/interview/InterviewLayout";

export const metadata: Metadata = {
  title: "AI Interview | StudyMateAI",
  description: "Simulate a real interview with voice-based AI Q&A.",
};

export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-[#05050a]">
      <InterviewLayout />
    </div>
  );
}