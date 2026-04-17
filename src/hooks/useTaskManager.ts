import { useState } from "react";
import type { Task } from "../domain/task.types";
import { removeTaskCascade } from "../domain/dependency";
import { pushState, undo, redo } from "../domain/history";
import type { History } from "../domain/history";

export const useTaskManager = () => {
  const [historyState, setHistoryState] = useState<History<Task[]>>({
    states: [[]],
    index: 0,
  });

  const tasks = historyState.states[historyState.index];

  const commit = (newTasks: Task[]) => {
    setHistoryState(prev => pushState(prev, newTasks));
  };

  const addTask = (title: string, parentId: string | null) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      parentId,
    };

    commit([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    const updated = removeTaskCascade(tasks, taskId);
    commit(updated);
  };

  const undoAction = () => {
    setHistoryState(prev => undo(prev));
  };

  const redoAction = () => {
    setHistoryState(prev => redo(prev));
  };

  return {
    tasks,
    addTask,
    deleteTask,
    undoAction,
    redoAction,
    historyState,
  };
};