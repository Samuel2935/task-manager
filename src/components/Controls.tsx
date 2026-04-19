import { useState } from "react";

type Props = {
  undo: () => void;
  redo: () => void;
  generateAI: (prompt: string) => void;
  isGeneratingAI: boolean;
};

export default function Controls({
  undo,
  redo,
  generateAI,
  isGeneratingAI,
}: Props) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateAI(prompt);
  };

  return (
    <div className="bg-slate-900 p-3 rounded-xl space-y-3">
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isGeneratingAI}
        placeholder="Ask AI to generate tasks..."
        className="w-full px-3 py-2 bg-slate-800 rounded-lg"
      />

      <div className="flex flex-col sm:flex-row gap-2">
        <button className="bg-slate-700 px-3 py-2 rounded-lg w-full sm:w-auto" onClick={undo}>
          Undo
        </button>

        <button className="bg-slate-700 px-3 py-2 rounded-lg w-full sm:w-auto" onClick={redo}>
          Redo
        </button>

        <button
          onClick={handleGenerate}
          disabled={isGeneratingAI}
          className="ml-0 sm:ml-auto w-full sm:w-auto bg-emerald-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {isGeneratingAI ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating...
            </>
          ) : (
            "Generate AI"
          )}
        </button>
      </div>
    </div>
  );
}
