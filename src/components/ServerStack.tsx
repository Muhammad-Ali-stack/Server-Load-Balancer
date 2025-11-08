import { Server as ServerIcon, Activity, XCircle } from 'lucide-react';
import { Server, Task } from '../types/server';

interface ServerStackProps {
  server: Server;
  maxLoad: number;
  onRemoveTask: (serverId: number, taskId: string) => void;
}

export const ServerStack = ({ server, maxLoad, onRemoveTask }: ServerStackProps) => {
  const capacityPercentage = (server.load / server.capacity) * 100;
  const loadPercentage = maxLoad > 0 ? (server.load / maxLoad) * 100 : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-48 border-2 border-gray-200 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ServerIcon className="w-5 h-5" style={{ color: server.color }} />
            <span className="font-semibold text-gray-800">{server.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">{server.load}/{server.capacity}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${capacityPercentage}%`,
                backgroundColor: server.color
              }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {capacityPercentage.toFixed(0)}% Capacity
          </p>
        </div>

        <div className="space-y-1 max-h-64 overflow-y-auto">
          {server.tasks.map((task: Task) => (
            <div
              key={task.id}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded p-2 text-xs flex items-center justify-between group hover:from-blue-100 hover:to-blue-200 transition-colors"
            >
              <span className="font-medium text-gray-700 truncate">{task.name}</span>
              <button
                onClick={() => onRemoveTask(server.id, task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XCircle className="w-4 h-4 text-red-500 hover:text-red-700" />
              </button>
            </div>
          ))}
        </div>

        {server.tasks.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-4">
            No tasks assigned
          </div>
        )}
      </div>
    </div>
  );
};
