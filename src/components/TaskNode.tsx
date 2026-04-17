import type { Task } from "../domain/task.types";

type Props = {
  task: Task;
  children?: React.ReactNode;
  onDelete: (id: string) => void;
};

export default function TaskNode({ task, children, onDelete }: Props) {
  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center justify-between rounded-lg bg-slate-800 p-2 gap-2">
        <span className="truncate">{task.title}</span>

        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-600"
        >
          Delete
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
