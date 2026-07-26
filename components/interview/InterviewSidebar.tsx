"use client";

interface InterviewSidebarProps {
  difficulty?: string;
  questionNumber?: number;
  totalQuestions?: number;
}

export default function InterviewSidebar({
  difficulty = "Medium",
  questionNumber = 1,
  totalQuestions = 5,
}: InterviewSidebarProps) {
  return (
    <aside className="h-full rounded-xl border border-white/10 bg-white/5 p-5 text-white">
      <h2 className="mb-4 text-lg font-semibold">
        Interview Progress
      </h2>

      <div className="space-y-3 text-sm text-gray-300">
        <p>
          Difficulty:{" "}
          <span className="text-purple-400">{difficulty}</span>
        </p>

        <p>
          Question:{" "}
          <span className="text-cyan-400">
            {questionNumber}/{totalQuestions}
          </span>
        </p>
      </div>
    </aside>
  );
}