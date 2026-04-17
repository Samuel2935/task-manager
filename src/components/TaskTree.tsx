import type { Task } from "../domain/task.types";
import TaskNode from "./TaskNode";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
};

export default function TaskTree({ tasks, onDelete }: Props) {
  const render = (parentId: string | null = null) =>
    tasks
      .filter(t => t.parentId === parentId)
      .map(task => (
        <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg mt-2" key={task.id}>
        <TaskNode key={task.id} task={task} onDelete={onDelete}>
          {render(task.id)}
        </TaskNode>
        </div>
      ));

  return <div className="mt-2">{render()}</div>;
}