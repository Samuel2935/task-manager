export type History<T> = {
  states: T[];
  index: number;
};

export const pushState = <T,>(
  history: History<T>,
  newState: T
): History<T> => {
  const trimmed = history.states.slice(0, history.index + 1);

  return {
    states: [...trimmed, newState],
    index: trimmed.length,
  };
};

export const undo = <T,>(history: History<T>): History<T> => ({
  ...history,
  index: Math.max(0, history.index - 1),
});

export const redo = <T,>(history: History<T>): History<T> => ({
  ...history,
  index: Math.min(history.states.length - 1, history.index + 1),
});

export const generateAITask = <T,>(history: History<T>, aiFunc: (current: T) => T): History<T> => {
  const currentState = history.states[history.index];
  const newState = aiFunc(currentState);
  return pushState(history, newState);
};

