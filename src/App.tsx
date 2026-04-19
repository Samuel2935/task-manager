import { useTaskManager } from "./hooks/useTaskManager";
import Controls from "./components/Controls";
import TaskTree from "./components/TaskTree";

export default function App() {
  const {
    tasks,
    deleteTask,
    undoAction,
    redoAction,
    generateAI,
    isGeneratingAI,
    error,
  } = useTaskManager();

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          AI Task Manager
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-2 rounded-lg">
            {error}
          </div>
        )}

        <Controls
          undo={undoAction}
          redo={redoAction}
          generateAI={generateAI}
          isGeneratingAI={isGeneratingAI}
        />

        <TaskTree tasks={tasks} onDelete={deleteTask} />
      </div>
    </div>
  );
}
