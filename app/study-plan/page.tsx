import StudyPlanGenerator from "@/components/study-plan/StudyPlanGenerator";

export default function StudyPlanPage() {
  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-white">
          AI Study Planner
        </h1>

        <p className="mt-2 text-white/50">
          Generate a personalized learning roadmap based on your goal,
          available time, and experience level.
        </p>

        <div className="mt-8">
          <StudyPlanGenerator />
        </div>
      </div>
    </main>
  );
}