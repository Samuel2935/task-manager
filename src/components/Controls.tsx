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
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-900 rounded-xl">
      
      {/* Left actions */}
      <div className="flex gap-2">
        <button
          onClick={undo}
          className="flex-1 sm:flex-none px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
        >
          Undo
        </button>

        <button
          onClick={redo}
          className="flex-1 sm:flex-none px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
        >
          Redo
        </button>
      </div>

      {/* AI Button */}
      <button
        onClick={generateAI}
        disabled={isGeneratingAI}
        className={`w-full sm:w-auto sm:ml-auto px-3 py-2 rounded-lg transition flex justify-center items-center ${
          isGeneratingAI
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-500"
        }`}
      >
        {isGeneratingAI ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 bg-amber-500 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Generating...
          </span>
        ) : (
          "Generate AI Tasks"
        )}
      </button>
    </div>
  );
}