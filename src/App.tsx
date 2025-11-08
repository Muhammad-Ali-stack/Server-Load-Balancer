import { useState, useEffect } from 'react';
import { Server, Task } from './types/server';
import { distributeTasksEvenly, calculateStats, getServerColor } from './utils/loadBalancer';
import { ServerStack } from './components/ServerStack';
import { StatsPanel } from './components/StatsPanel';
import { ControlPanel } from './components/ControlPanel';
import { Database } from 'lucide-react';

function App() {
  const [servers, setServers] = useState<Server[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [taskCounter, setTaskCounter] = useState(1);

  useEffect(() => {
    const stats = calculateStats(servers);
    const updatedServers = servers.map(server => ({
      ...server,
      color: getServerColor(server.load, stats.maxLoad)
    }));
    setServers(updatedServers);
  }, [servers.length]);

  useEffect(() => {
    if (servers.length > 0) {
      const redistributed = distributeTasksEvenly(servers, allTasks);
      const stats = calculateStats(redistributed);
      const withColors = redistributed.map(server => ({
        ...server,
        color: getServerColor(server.load, stats.maxLoad)
      }));
      setServers(withColors);
    }
  }, [allTasks, servers.length]);

  const addServer = () => {
    if (servers.length >= 15) return;

    const newServer: Server = {
      id: servers.length + 1,
      name: `Server ${servers.length + 1}`,
      tasks: [],
      load: 0,
      capacity: 20,
      color: '#10b981'
    };

    setServers(prev => [...prev, newServer]);
  };

  const removeServer = () => {
    if (servers.length === 0) return;
    setServers(prev => prev.slice(0, -1));
  };

  const addTask = () => {
    if (servers.length === 0) {
      alert('Please add at least one server first!');
      return;
    }

    const newTask: Task = {
      id: `task-${taskCounter}`,
      name: `Task ${taskCounter}`,
      assignedAt: Date.now()
    };

    setTaskCounter(prev => prev + 1);
    setAllTasks(prev => [...prev, newTask]);
  };

  const addMultipleTasks = (count: number) => {
    if (servers.length === 0) {
      alert('Please add at least one server first!');
      return;
    }

    const newTasks: Task[] = [];
    for (let i = 0; i < count; i++) {
      newTasks.push({
        id: `task-${taskCounter + i}`,
        name: `Task ${taskCounter + i}`,
        assignedAt: Date.now() + i
      });
    }

    setTaskCounter(prev => prev + count);
    setAllTasks(prev => [...prev, ...newTasks]);
  };

  const removeTask = (serverId: number, taskId: string) => {
    setAllTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const removeMultipleTasks = (count: number) => {
    setAllTasks(prev => {
      const toRemove = Math.min(count, prev.length);
      return prev.slice(0, prev.length - toRemove);
    });
  };

  const clearAllTasks = () => {
    setAllTasks([]);
  };

  const stats = calculateStats(servers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Database className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Job Scheduler on Servers
            </h1>
          </div>
          <p className="text-gray-600">
            Visualize real-time task distribution across your server infrastructure
          </p>
        </div>

        <div className="mb-8">
          <StatsPanel stats={stats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1">
            <ControlPanel
              serverCount={servers.length}
              taskCount={allTasks.length}
              onAddServer={addServer}
              onRemoveServer={removeServer}
              onAddTask={addTask}
              onAddMultipleTasks={addMultipleTasks}
              onRemoveMultipleTasks={removeMultipleTasks}
              onClearAll={clearAllTasks}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 min-h-[500px]">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Server Visualization</h2>

              {servers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <Database className="w-20 h-20 mb-4" />
                  <p className="text-lg">No servers available</p>
                  <p className="text-sm">Add servers to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {servers.map(server => (
                    <ServerStack
                      key={server.id}
                      server={server}
                      maxLoad={stats.maxLoad}
                      onRemoveTask={removeTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Low Load (0-33%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Medium Load (34-66%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>High Load (67-100%)</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 border-l pl-4">
              Made by Muhammad Ali, Muhammad Khubaib, Hassan Siddique, Huzaifa Imtiaz
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
