"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileSearch, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import UploadResume from "./UploadResume";
import ResumeScore from "./ResumeScore";
import KeywordAnalysis from "./KeywordAnalysis";
import ATSAnalysis from "./ATSAnalysis";
import AIRecommendations from "./AIRecommendations";

type AnalysisStage = "idle" | "analyzing" | "complete";

export default function ResumeLayout() {
  const [stage, setStage] = useState<AnalysisStage>("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelected = (name: string) => {
    setFileName(name);
    setStage("analyzing");

    setTimeout(() => {
      setStage("complete");
    }, 1800);
  };

  const handleReset = () => {
    setStage("idle");
    setFileName(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#05060a] bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),_transparent_60%)] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <FileSearch className="h-5 w-5 text-indigo-400" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                Resume Analyzer
              </h1>

              <p className="mt-1 text-sm text-white/50">
                Upload your resume to receive an AI-powered score, ATS
                compatibility analysis, keyword matching, and personalized
                recommendations.
              </p>
            </div>
          </div>

          {stage === "complete" && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
              Analyze Another Resume
            </Button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {stage !== "complete" ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <UploadResume
                isAnalyzing={stage === "analyzing"}
                fileName={fileName}
                onFileSelected={handleFileSelected}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ResumeScore />
                <ATSAnalysis />
              </div>

              <KeywordAnalysis />

              <AIRecommendations />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}