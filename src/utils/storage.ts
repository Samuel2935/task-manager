import type { History } from "../domain/history";
import type { Task } from "../domain/task.types";

const HISTORY_KEY = "task-manager-history";

export const saveHistory = (data: History<Task[]>) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
};

export const loadHistory = (): History<Task[]> => {
  const raw = localStorage.getItem(HISTORY_KEY);

  if (!raw) {
    return {
      states: [[]],
      index: 0,
    };
  }

  try {
    const parsed = JSON.parse(raw);

    // safety fallback
    if (!parsed?.states?.length) {
      return {
        states: [[]],
        index: 0,
      };
    }

    return parsed;
  } catch {
    return {
      states: [[]],
      index: 0,
    };
  }
};