// components/interview/TranscriptPanel.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export interface TranscriptMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
}

interface TranscriptPanelProps {
  messages: TranscriptMessage[];
  isTyping?: boolean;
}

export default function TranscriptPanel({
  messages,
  isTyping = false,
}: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <div className="border-b border-white/10 px-5 py-4">
        <h3 className="text-sm font-semibold text-white">Live Transcript</h3>
      </div>

      <div
        ref={scrollRef}
        className="flex max-h-80 flex-col gap-4 overflow-y-auto px-5 py-4 sm:max-h-96"
      >
        {messages.map((message) => {
          const isAI = message.sender === "ai";
          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-2.5 ${isAI ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                  isAI
                    ? "bg-gradient-to-br from-purple-500 to-blue-500"
                    : "bg-white/10"
                }`}
              >
                {isAI ? (
                  <Bot className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
                ) : (
                  <User className="h-3.5 w-3.5 text-gray-300" strokeWidth={1.8} />
                )}
              </div>

              <div
                className={`flex max-w-[80%] flex-col gap-1 ${
                  isAI ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    isAI
                      ? "rounded-tl-sm border border-white/10 bg-white/5 text-gray-200"
                      : "rounded-tr-sm bg-gradient-to-br from-purple-600/80 to-blue-600/80 text-white"
                  }`}
                >
                  {message.text}
                </div>
                <span className="px-1 text-[10px] text-gray-500">
                  {message.timestamp}
                </span>
              </div>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <Bot className="h-3.5 w-3.5 text-white" strokeWidth={1.8} />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-3.5 py-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-gray-400"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}