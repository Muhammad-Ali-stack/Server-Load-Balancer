export interface Task {
  id: string;
  name: string;
  assignedAt: number;
}

export interface Server {
  id: number;
  name: string;
  tasks: Task[];
  load: number;
  color: string;
  capacity: number;
}

export interface Stats {
  totalServers: number;
  totalTasks: number;
  avgLoad: number;
  maxLoad: number;
  minLoad: number;
}
