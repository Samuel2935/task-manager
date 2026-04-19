export type History<T> = {
  states: T[];
  index: number;
};

const MAX_HISTORY = 50;

export const pushState = <T,>(history: History<T>, newState: T): History<T> => {
  const trimmed = history.states.slice(0, history.index + 1);
  const next = [...trimmed, newState].slice(-MAX_HISTORY);

  return {
    states: next,
    index: next.length - 1,
  };
};

export const undo = <T,>(h: History<T>): History<T> => ({
  ...h,
  index: Math.max(0, h.index - 1),
});

export const redo = <T,>(h: History<T>): History<T> => ({
  ...h,
  index: Math.min(h.states.length - 1, h.index + 1),
});
