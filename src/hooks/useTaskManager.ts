import { useState } from "react";
import type { Task } from "../domain/task.types";
import { removeTaskCascade } from "../domain/dependency";
import { pushState, undo, redo } from "../domain/history";
import type { History } from "../domain/history";

export const useTaskManager = () => {
const [isGeneratingAI, setIsGeneratingAI] = useState(false);

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

 const generateAITasks = async () => {
  await new Promise((res) => setTimeout(res, 2000));

  const aiTasks = [
    "Break down project requirements",
    "Write API design",
    "Implement core logic",
    "Add tests",
  ];

  return aiTasks;
};

// const generateAI = async () => {
//   const aiTasks = await generateAITasks();

//   const formattedTasks = aiTasks.map((title) => ({
//     id: crypto.randomUUID(),
//     title,
//     parentId: null,
//   }));

//   commit([...tasks, ...formattedTasks]);
// };

const generateAI = async () => {
  if (isGeneratingAI) return; // prevent spam clicks

  setIsGeneratingAI(true);

  try {
    const aiTasks = await generateAITasks();

    const formattedTasks = aiTasks.map((title) => ({
      id: crypto.randomUUID(),
      title,
      parentId: null,
    }));

    commit([...tasks, ...formattedTasks]);
  } finally {
    setIsGeneratingAI(false);
  }
};

  return {
    tasks,
    addTask,
    deleteTask,
    undoAction,
    redoAction,
    historyState,
    generateAI,
    isGeneratingAI,
  };
};