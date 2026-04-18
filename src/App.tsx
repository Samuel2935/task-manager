import { useTaskManager } from "./hooks/useTaskManager";
import TaskInput from "./components/TaskInput";
import TaskTree from "./components/TaskTree";
import Controls from "./components/Controls";

export default function App() {
  const { tasks, addTask, deleteTask, undoAction, redoAction, historyState, generateAI, isGeneratingAI } =
    useTaskManager();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center p-6">
      <div className="w-full max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold">Collaborative Task Manager</h1>

        <h2>Collaborative Task Manager</h2>

        <TaskInput tasks={tasks} onAdd={addTask} />

        <Controls undo={undoAction} redo={redoAction} generateAI={generateAI} isGeneratingAI={isGeneratingAI} />

        <input
          type="range"
          min={0}
          max={historyState.states.length - 1}
          value={historyState.index}
          onChange={() => {}}
        />

        <TaskTree tasks={tasks} onDelete={deleteTask} />
      </div>
    </div>
  );
}
