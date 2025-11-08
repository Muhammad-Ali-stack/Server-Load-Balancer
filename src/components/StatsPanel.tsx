import { Server, BarChart3, Activity, TrendingUp } from 'lucide-react';
import { Stats } from '../types/server';

interface StatsPanelProps {
  stats: Stats;
}

export const StatsPanel = ({ stats }: StatsPanelProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <StatCard
        icon={<Server className="w-6 h-6" />}
        label="Total Servers"
        value={stats.totalServers}
        color="bg-blue-500"
      />
      <StatCard
        icon={<BarChart3 className="w-6 h-6" />}
        label="Total Tasks"
        value={stats.totalTasks}
        color="bg-green-500"
      />
      <StatCard
        icon={<Activity className="w-6 h-6" />}
        label="Avg Load"
        value={stats.avgLoad.toFixed(1)}
        color="bg-purple-500"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Max Load"
        value={stats.maxLoad}
        color="bg-red-500"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Min Load"
        value={stats.minLoad}
        color="bg-teal-500"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};
