"use client";

interface QuestionDisplayProps {
  question?: string;
}

export default function QuestionDisplay({
  question = "Tell me about yourself.",
}: QuestionDisplayProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-lg font-semibold text-white">
        Interview Question
      </h2>

      <p className="text-gray-300">
        {question}
      </p>
    </div>
  );
}