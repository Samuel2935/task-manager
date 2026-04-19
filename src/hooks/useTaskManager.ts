import { useEffect, useState } from "react";
import type { Task } from "../domain/task.types";
import { removeTaskCascade } from "../domain/dependency";
import { pushState, undo, redo } from "../domain/history";
import type { History } from "../domain/history";
import { generateAITasks } from "../services/ai";
import { loadHistory, saveHistory } from "../utils/storage";

export const useTaskManager = () => {
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // ✅ SINGLE SOURCE OF TRUTH
  const [historyState, setHistoryState] = useState<History<Task[]>>(
    loadHistory()
  );

  // ✅ SAFE DERIVED STATE
  const tasks =
    historyState.states?.[historyState.index] ?? [];

  // ======================
  // PERSISTENCE
  // ======================

  useEffect(() => {
    saveHistory(historyState);
  }, [historyState]);

  // ======================
  // CORE COMMIT
  // ======================

  const commit = (newTasks: Task[]) => {
    setHistoryState((prev) => pushState(prev, newTasks));
  };

  // ======================
  // TASK ACTIONS
  // ======================

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

  // ======================
  // HISTORY ACTIONS
  // ======================

  const undoAction = () => {
    setHistoryState((prev) => undo(prev));
  };

  const redoAction = () => {
    setHistoryState((prev) => redo(prev));
  };

  // ======================
  // AI INTEGRATION
  // ======================

  const generateAI = async () => {
    if (isGeneratingAI) return;

    setIsGeneratingAI(true);

    try {
      const aiTasks = await generateAITasks();

      const formattedTasks: Task[] = aiTasks.map((title) => ({
        id: crypto.randomUUID(),
        title,
        parentId: null,
      }));

      commit([...tasks, ...formattedTasks]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // ======================
  // EXPORT API
  // ======================

  return {
    tasks,
    addTask,
    deleteTask,
    undoAction,
    redoAction,
    generateAI,
    isGeneratingAI,
    historyState,
  };
};