import type { History } from "../domain/history";
import type { Task } from "../domain/task.types";

const KEY = "task-history";
const VERSION = 1;

export const saveHistory = (data: History<Task[]>) => {
  localStorage.setItem(
    KEY,
    JSON.stringify({ version: VERSION, data })
  );
};

export const loadHistory = (): History<Task[]> => {
  const raw = localStorage.getItem(KEY);

  if (!raw) return { states: [[]], index: 0 };

  try {
    const parsed = JSON.parse(raw);

    if (parsed.version !== VERSION) {
      return { states: [[]], index: 0 };
    }

    return parsed.data;
  } catch {
    return { states: [[]], index: 0 };
  }
};