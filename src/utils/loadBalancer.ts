import { Server, Task } from '../types/server';

export const distributeTasksEvenly = (servers: Server[], tasks: Task[]): Server[] => {
  const serverCount = servers.length;
  if (serverCount === 0) return servers;

  const newServers = servers.map(server => ({
    ...server,
    tasks: [],
    load: 0
  }));

  tasks.forEach((task) => {
    const serverWithMinLoad = newServers.reduce((min, server) =>
      server.tasks.length < min.tasks.length ? server : min
    );
    serverWithMinLoad.tasks.push(task);
    serverWithMinLoad.load = serverWithMinLoad.tasks.length;
  });

  return newServers;
};

export const calculateStats = (servers: Server[]) => {
  const totalServers = servers.length;
  const totalTasks = servers.reduce((sum, server) => sum + server.tasks.length, 0);
  const loads = servers.map(s => s.load);
  const maxLoad = Math.max(...loads, 0);
  const minLoad = Math.min(...loads, 0);
  const avgLoad = totalServers > 0 ? totalTasks / totalServers : 0;

  return {
    totalServers,
    totalTasks,
    avgLoad,
    maxLoad,
    minLoad
  };
};

export const getServerColor = (load: number, maxLoad: number): string => {
  if (maxLoad === 0) return '#10b981';
  const percentage = load / maxLoad;

  if (percentage < 0.33) return '#10b981';
  if (percentage < 0.66) return '#f59e0b';
  return '#ef4444';
};
