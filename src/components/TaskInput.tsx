import { useState } from "react";
import type { Task } from "../domain/task.types";

type Props = {
  tasks: Task[];
  onAdd: (title: string, parentId: string | null) => void;
};

export default function TaskInput({ tasks, onAdd }: Props) {
  const [text, setText] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);

  const handleAdd = () => {
    const value = text.trim();
    if (!value) return;

    onAdd(value, parentId);
    setText("");
    setParentId(null);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 p-3 bg-slate-900 rounded-xl">
      
      {/* Input */}
      <input
        className="flex-1 w-full px-3 py-2 bg-slate-800 rounded-lg outline-none placeholder:text-slate-400"
        value={text}
        placeholder="Enter task..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />

      {/* Parent selector */}
      <select
        className="w-full sm:w-auto px-3 py-2 bg-slate-800 rounded-lg text-slate-200"
        value={parentId ?? ""}
        onChange={(e) => setParentId(e.target.value || null)}
      >
        <option value="">No Parent</option>
        {tasks.map((t) => (
          <option key={t.id} value={t.id}>
            {t.title}
          </option>
        ))}
      </select>

      {/* Button */}
      <button
        onClick={handleAdd}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition disabled:bg-slate-600 disabled:cursor-not-allowed"
        disabled={!text.trim()}
      >
        Add
      </button>
    </div>
  );
}