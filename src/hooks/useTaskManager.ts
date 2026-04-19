import { useEffect, useState } from "react";
import type { Task } from "../domain/task.types";
import { removeTaskCascade } from "../domain/dependency";
import { pushState, undo, redo } from "../domain/history";
import type { History } from "../domain/history";
import { generateAITasks } from "../services/ai";
import { loadHistory, saveHistory } from "../utils/storage";

export const useTaskManager = () => {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [historyState, setHistoryState] = useState<History<Task[]>>(
    loadHistory()
  );

  const tasks = historyState.states?.[historyState.index] ?? [];

  useEffect(() => {
    saveHistory(historyState);
  }, [historyState]);

  const commit = (newTasks: Task[]) => {
    setHistoryState((p) => pushState(p, newTasks));
  };

  const addTask = (title: string, parentId: string | null) => {
    if (!title.trim()) return;

    commit([
      ...tasks,
      { id: crypto.randomUUID(), title, parentId },
    ]);
  };

  const deleteTask = (id: string) => {
    commit(removeTaskCascade(tasks, id));
  };

  const undoAction = () => setHistoryState((p) => undo(p));
  const redoAction = () => setHistoryState((p) => redo(p));

  const generateAI = async (prompt: string) => {
    if (!prompt.trim() || isGeneratingAI) return;

    setIsGeneratingAI(true);
    setError(null);

    try {
      const aiTasks = await generateAITasks(prompt);

      const existing = new Set(tasks.map((t) => t.title));

      const formatted: Task[] = aiTasks
        .filter((t) => !existing.has(t))
        .map((title) => ({
          id: crypto.randomUUID(),
          title,
          parentId: null,
        }));

      commit([...tasks, ...formatted]);
    } catch {
      setError("AI generation failed");
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
    generateAI,
    isGeneratingAI,
    error,
  };
};