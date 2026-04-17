import { useState } from "react";
import type { Task } from "../domain/task.types";

type Props = {
  tasks: Task[];
  onAdd: (title: string, parentId: string | null) => void;
};

export default function TaskInput({ tasks, onAdd }: Props) {
  const [text, setText] = useState("");
  const [parentId, setParentId] = useState<string | null>(null);

  return (
    <div className="flex gap-2 p-3 bg-slate-900 rounded-xl">
      <input
      className="flex-1 px-3 py-2 bg-slate-800 rounded-lg outline-none"
        value={text}
        placeholder="Enter Task"
        onChange={(e) => setText(e.target.value)}
      />

      <select
      className="px-3 py-2 bg-slate-800 rounded-lg"
        onChange={(e) =>
          setParentId(e.target.value || null)
        }
      >
        <option value="">No Parent</option>
        {tasks.map(t => (
          <option key={t.id} value={t.id}>
            {t.title}
          </option>
        ))}
      </select>

      <button
      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
        onClick={() => {
          onAdd(text, parentId);
          setText("");
        }}
      >
        Add
      </button>
    </div>
  );
}