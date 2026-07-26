// components/interview/InterviewLayout.tsx
"use client";

import { useEffect, useState } from "react";
import InterviewerPanel, {
  type InterviewerStatus,
} from "@/components/interview/InterviewerPanel";
import QuestionDisplay from "@/components/interview/QuestionDisplay";
import TranscriptPanel, {
  type TranscriptMessage,
} from "@/components/interview/TranscriptPanel";
import RecordingControls from "@/components/interview/RecordingControls";
import InterviewSidebar from "@/components/interview/InterviewSidebar";

type Difficulty = "Easy" | "Medium" | "Hard";

interface InterviewQuestion {
  id: string;
  question: string;
  topic: string;
  difficulty: Difficulty;
}

const QUESTIONS: InterviewQuestion[] = [
  {
    id: "iq1",
    question:
      "Tell me about a technical decision you made that you'd approach differently today.",
    topic: "Behavioral",
    difficulty: "Medium",
  },
  {
    id: "iq2",
    question:
      "How would you design a URL shortening service that handles 100M requests per day?",
    topic: "System Design",
    difficulty: "Hard",
  },
  {
    id: "iq3",
    question:
      "Walk me through how you'd debug a memory leak in a Node.js production service.",
    topic: "Backend Engineering",
    difficulty: "Hard",
  },
  {
    id: "iq4",
    question: "Why are you interested in this role, and why now?",
    topic: "Behavioral",
    difficulty: "Easy",
  },
];

const INITIAL_TRANSCRIPT: TranscriptMessage[] = [
  {
    id: "m1",
    sender: "ai",
    text: "Hi! I'm your AI interviewer today. We'll go through a few questions — take your time with each answer.",
    timestamp: "10:02 AM",
  },
  {
    id: "m2",
    sender: "ai",
    text: "Let's start with our first question. Whenever you're ready, tap the microphone.",
    timestamp: "10:02 AM",
  },
];

export default function InterviewLayout() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [status, setStatus] = useState<InterviewerStatus>("speaking");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [messages, setMessages] = useState<TranscriptMessage[]>(INITIAL_TRANSCRIPT);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStatus("speaking");
    const timeout = setTimeout(() => setStatus("listening"), 1800);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleToggleRecording = (): void => {
    setIsRecording((prev) => {
      const next = !prev;
      setStatus(next ? "listening" : "thinking");
      return next;
    });
  };

  const pushUserMessage = (): void => {
    const userMessage: TranscriptMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: "That's my answer for this one — I focused on trade-offs and walked through the reasoning step by step.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const advanceQuestion = (): void => {
    setIsRecording(false);
    setStatus("thinking");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const isLast = currentIndex >= totalQuestions - 1;
      const aiMessage: TranscriptMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: isLast
          ? "That wraps up all the questions. Great work today — your results will be ready shortly."
          : "Thanks for that answer. Let's move on to the next question.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (!isLast) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setStatus("speaking");
      }
    }, 1400);
  };

  const handleSubmitAnswer = (): void => {
    pushUserMessage();
    advanceQuestion();
  };

  const handleSkipQuestion = (): void => {
    advanceQuestion();
  };

  const handleEndInterview = (): void => {
    console.log("Interview ended at question", currentIndex + 1);
  };

 return (
  <div className="p-10 text-white">
    <h1>Interview Test</h1>

    <InterviewerPanel
      status={status}
      elapsedSeconds={elapsedSeconds}
      questionNumber={1}
      totalQuestions={4}
    />
  </div>
);
}