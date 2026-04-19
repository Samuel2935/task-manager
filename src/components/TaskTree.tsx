import type { Task } from "../domain/task.types";
import TaskNode from "./TaskNode";

export default function TaskTree({
  tasks,
  onDelete,
}: {
  tasks: Task[];
  onDelete: (id: string) => void;
}) {
  const render = (parentId: string | null = null) =>
    tasks
      .filter((t) => t.parentId === parentId)
      .map((t) => (
        <TaskNode key={t.id} task={t} onDelete={onDelete}>
          {render(t.id)}
        </TaskNode>
      ));

  if (!tasks.length) {
    return (
      <div className="text-slate-400 text-center mt-10">
        No tasks yet. Generate something 🚀
      </div>
    );
  }

  return <div className="space-y-2">{render()}</div>;
}
