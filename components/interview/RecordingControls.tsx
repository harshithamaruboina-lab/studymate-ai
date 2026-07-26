"use client";

interface RecordingControlsProps {
  isRecording?: boolean;
  onStart?: () => void;
  onStop?: () => void;
}

export default function RecordingControls({
  isRecording = false,
  onStart,
  onStop,
}: RecordingControlsProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      {!isRecording ? (
        <button
          onClick={onStart}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={onStop}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
}