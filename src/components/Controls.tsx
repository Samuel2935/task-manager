type Props = {
  undo: () => void;
  redo: () => void;
  generateAI: () => void;
  isGeneratingAI: boolean;
};

export default function Controls({
  undo,
  redo,
  generateAI,
  isGeneratingAI,
}: Props) {
  return (
    <div className="flex gap-2 p-3 bg-slate-900 rounded-xl">
      <button
        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
        onClick={undo}
      >
        Undo
      </button>
      <button
        className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
        onClick={redo}
      >
        Redo
      </button>

      <button
        onClick={generateAI}
        disabled={isGeneratingAI}
        className={`px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg ml-auto ${
          isGeneratingAI
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-500"
        }`}
      >
        {isGeneratingAI ? (
          <span className="flex items-center gap-2">
            <span className="bg-amber-500 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Generating...
          </span>
        ) : (
          "Generate AI Tasks"
        )}{" "}
      </button>
    </div>
  );
}
