"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Loader2, X } from "lucide-react";

interface UploadResumeProps {
  isAnalyzing: boolean;
  fileName: string | null;
  onFileSelected: (name: string) => void;
}

export default function UploadResume({
  isAnalyzing,
  fileName,
  onFileSelected,
}: UploadResumeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];

      if (file) {
        setPendingFile(file.name);
      }
    },
    []
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPendingFile(file.name);
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleAnalyze = () => {
    if (pendingFile) {
      onFileSelected(pendingFile);
    }
  };

  const handleClearPending = () => {
    setPendingFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-xl">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex min-h-[320px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/10"
            : "border-white/20 bg-white/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileInput}
        />

        {isAnalyzing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />

            <h3 className="text-lg font-semibold text-white">
              Analyzing Resume...
            </h3>

            <p className="text-white/60">{fileName}</p>
          </motion.div>
        ) : pendingFile ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-5"
          >
            <div className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3">
              <FileText className="h-5 w-5 text-indigo-400" />

              <span className="text-white">{pendingFile}</span>

              <button
                type="button"
                onClick={handleClearPending}
                className="text-white/60 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAnalyze}
              className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Analyze Resume
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <UploadCloud className="h-14 w-14 text-indigo-400" />

            <h3 className="mt-5 text-xl font-semibold text-white">
              Upload Your Resume
            </h3>

            <p className="mt-2 text-center text-white/60">
              Drag & drop your resume here
              <br />
              or click below to browse.
            </p>

            <button
              onClick={handleBrowseClick}
              className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              Browse Files
            </button>

            <p className="mt-4 text-xs text-white/40">
              PDF, DOC, DOCX (Max 5 MB)
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}