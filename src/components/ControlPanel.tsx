import { Plus, Minus, PlayCircle, Trash2 } from 'lucide-react';

interface ControlPanelProps {
  serverCount: number;
  taskCount: number;
  onAddServer: () => void;
  onRemoveServer: () => void;
  onAddTask: () => void;
  onAddMultipleTasks: (count: number) => void;
  onRemoveMultipleTasks: (count: number) => void;
  onClearAll: () => void;
}

export const ControlPanel = ({
  serverCount,
  taskCount,
  onAddServer,
  onRemoveServer,
  onAddTask,
  onAddMultipleTasks,
  onRemoveMultipleTasks,
  onClearAll
}: ControlPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Control Panel</h2>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Server Management</h3>
          <div className="flex gap-2">
            <button
              onClick={onAddServer}
              disabled={serverCount >= 15}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Server
            </button>
            <button
              onClick={onRemoveServer}
              disabled={serverCount <= 0}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Minus className="w-4 h-4" />
              Remove Server
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Servers: {serverCount} / 15</p>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Tasks</h3>
          <button
            onClick={onAddTask}
            className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium mb-2"
          >
            <Plus className="w-4 h-4" />
            Add Single Task
          </button>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onAddMultipleTasks(5)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm"
            >
              <PlayCircle className="w-4 h-4" />
              +5
            </button>
            <button
              onClick={() => onAddMultipleTasks(10)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm"
            >
              <PlayCircle className="w-4 h-4" />
              +10
            </button>
            <button
              onClick={() => onAddMultipleTasks(20)}
              className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm"
            >
              <PlayCircle className="w-4 h-4" />
              +20
            </button>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Remove Tasks</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onRemoveMultipleTasks(5)}
              disabled={taskCount < 5}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm font-medium"
            >
              <Minus className="w-4 h-4" />
              -5
            </button>
            <button
              onClick={() => onRemoveMultipleTasks(10)}
              disabled={taskCount < 10}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm font-medium"
            >
              <Minus className="w-4 h-4" />
              -10
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total Tasks: {taskCount}</p>
        </div>

        <div>
          <button
            onClick={onClearAll}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};
