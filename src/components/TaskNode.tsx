import type { Task } from "../domain/task.types";

export default function TaskNode({
  task,
  onDelete,
  children,
}: {
  task: Task;
  onDelete: (id: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="ml-2 sm:ml-4 mt-2">
      <div className="bg-slate-800 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="wrap-break-word text-sm sm:text-base">{task.title}</span>

        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 self-end sm:self-auto"
        >
          Delete
        </button>
      </div>

      {children}
    </div>
  );
}
