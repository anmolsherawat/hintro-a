import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon, iconBgColor, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
      <div className={cn("p-3 rounded-lg", iconBgColor)}>
        <Icon size={24} className={iconColor} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};
