import type { Task } from "./task.types";


export const getDescendants = (tasks: Task[], taskId: string): Task[] => {
  const children = tasks.filter(t => t.parentId === taskId);

  return children.reduce<Task[]>((acc, child) => {
    return [
      ...acc,
      child,
      ...getDescendants(tasks, child.id),
    ];
  }, []);
};

export const removeTaskCascade = (tasks: Task[], taskId: string): Task[] => {
  const descendants = getDescendants(tasks, taskId).map(t => t.id);

  return tasks.filter(
    t => t.id !== taskId && !descendants.includes(t.id)
  );
};

