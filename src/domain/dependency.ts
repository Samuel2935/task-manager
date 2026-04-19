import type { Task } from "./task.types";

export const removeTaskCascade = (tasks: Task[], id: string): Task[] => {
  const toDelete = new Set<string>();

  const dfs = (taskId: string) => {
    toDelete.add(taskId);
    tasks
      .filter((t) => t.parentId === taskId)
      .forEach((c) => dfs(c.id));
  };

  dfs(id);

  return tasks.filter((t) => !toDelete.has(t.id));
};
