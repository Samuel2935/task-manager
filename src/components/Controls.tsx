type Props = {
  undo: () => void;
  redo: () => void;
};

export default function Controls({ undo, redo }: Props) {
  return (
    <div className="flex gap-2 p-3 bg-slate-900 rounded-xl">
      <button
       className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
       onClick={undo}>
        Undo
      </button>
      <button
       className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
       onClick={redo}>
        Redo
      </button>
       <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg ml-auto">
        Generate AI Tasks
      </button>
    </div>
  );
}