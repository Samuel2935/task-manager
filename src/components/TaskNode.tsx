import type { Task } from "../domain/task.types";

type Props = {
  task: Task;
  children?: React.ReactNode;
  onDelete: (id: string) => void;
};

export default function TaskNode({ task, children, onDelete }: Props) {
  return (
    <div className="ml-3 sm:ml-4 mt-2">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg bg-slate-800 p-3">
        
        {/* Task title */}
        <span className="text-slate-200 wrap-break-word">
          {task.title}
        </span>

        {/* Delete button */}
        <button
          onClick={() => onDelete(task.id)}
          className="self-start sm:self-auto rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Children */}
      <div className="mt-1">{children}</div>
    </div>
  );
}