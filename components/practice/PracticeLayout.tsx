// components/practice/PracticeLayout.tsx
"use client";

import { useEffect, useState } from "react";
import ProgressHeader from "@/components/practice/ProgressHeader";
import QuestionCard from "@/components/practice/QuestionCard";
import AnswerBox from "@/components/practice/AnswerBox";
import BottomControls from "@/components/practice/BottomControls";
import SessionSidebar from "@/components/practice/SessionSidebar";

type Difficulty = "Easy" | "Medium" | "Hard";

interface PracticeQuestion {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
  difficulty: Difficulty;
  topic: string;
}

const QUESTIONS: PracticeQuestion[] = [
  {
    id: "q1",
    title: "Explain the difference between REST and GraphQL",
    description:
      "Describe the core architectural differences between REST and GraphQL APIs, and discuss a scenario where you'd choose one over the other.",
    difficulty: "Easy",
    topic: "API Design",
  },
  {
    id: "q2",
    title: "What will this code output, and why?",
    description:
      "Walk through the closure behavior in the snippet below and explain the final printed values.",
    codeSnippet: `function createCounters() {
  const counters = [];
  for (var i = 0; i < 3; i++) {
    counters.push(() => console.log(i));
  }
  return counters;
}

createCounters().forEach(fn => fn());`,
    difficulty: "Medium",
    topic: "JavaScript",
  },
  {
    id: "q3",
    title: "Design a rate limiter for a public API",
    description:
      "Describe how you would design a rate limiter that scales across multiple server instances. Cover algorithm choice, storage, and edge cases.",
    difficulty: "Hard",
    topic: "System Design",
  },
  {
    id: "q4",
    title: "Tell me about a time you disagreed with a teammate",
    description:
      "Using the STAR method, describe a situation where you disagreed with a colleague's technical decision and how you resolved it.",
    difficulty: "Medium",
    topic: "Behavioral",
  },
];

export default function PracticeLayout() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerChange = (value: string): void => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handlePrevious = (): void => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = (): void => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  };

  const handleSubmit = (): void => {
  alert("Answer submitted successfully!");

  if (!isLastQuestion) {
    setCurrentIndex((prev) => prev + 1);
  }
};

const handleEndSession = (): void => {
  alert("Session ended!");
  window.location.href = "/analytics";
};
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[7fr_3fr] lg:px-8 lg:py-8">
      {/* Left column (~70%) */}
      <div className="flex flex-col gap-5">
        <ProgressHeader
          currentQuestion={currentIndex + 1}
          totalQuestions={totalQuestions}
          elapsedSeconds={elapsedSeconds}
          difficulty={currentQuestion.difficulty}
          topic={currentQuestion.topic}
        />

        <QuestionCard
          questionId={currentQuestion.id}
          title={currentQuestion.title}
          description={currentQuestion.description}
          codeSnippet={currentQuestion.codeSnippet}
        />

        <AnswerBox
          value={answers[currentQuestion.id] ?? ""}
          onChange={handleAnswerChange}
        />

        <BottomControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          onEndSession={handleEndSession}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastQuestion}
        />
      </div>

      {/* Right column (~30%) */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <SessionSidebar
          todayGoal="Complete 4 practice questions across System Design and JavaScript."
          goalProgress={currentIndex}
          goalTarget={totalQuestions}
          accuracy={82}
          confidence={74}
          remainingQuestions={totalQuestions - (currentIndex + 1)}
          estimatedMinutesLeft={(totalQuestions - (currentIndex + 1)) * 6}
          tips={[
            "Structure your answer before you start typing.",
            "Aim for 3-5 sentences of depth per key point.",
            "Mention trade-offs — interviewers value reasoning over memorized answers.",
          ]}
        />
      </div>
    </div>
  );
}