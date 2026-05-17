import React, { useEffect, useState } from 'react';
import { PieChart, Clock, Sparkles, Calendar, CalendarDays } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getProfile, getDashboard, getCallHistory } from '../services/api';
import type { UserProfile, DashboardStats, CallSession } from '../types';
import { StatsCard } from './StatsCard';
import { format, isValid } from 'date-fns';
import { cn } from '../lib/utils';

export const DashboardView: React.FC = () => {
  const { userId } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [calls, setCalls] = useState<CallSession[]>([]);
  const [loading, setLoading] = useState(true);

  const safeFormatDate = (dateStr: string | null | undefined, formatStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (!isValid(date)) return '-';
    return format(date, formatStr);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileData, statsData, callsData] = await Promise.all([
          getProfile(userId),
          getDashboard(userId),
          getCallHistory(userId, 5)
        ]);
        setProfile(profileData);
        setStats(statsData);
        setCalls(Array.isArray(callsData) ? callsData : []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setCalls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return '0';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const isEmpty = userId === 'u1' || (stats?.total_sessions === 0 && calls.length === 0);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hi, {profile?.firstName || 'User'} 👋 Welcome to Hintro
            </h1>
            <p className="text-gray-500 mt-1">Ready to make your next call smarter?</p>
          </div>
          <button className="px-6 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Start New Call
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            label="Total Sessions" 
            value={stats?.total_sessions || 0} 
            icon={PieChart} 
            iconBgColor="bg-red-50" 
            iconColor="text-red-500" 
          />
          <StatsCard 
            label="Average Duration" 
            value={formatDuration(stats?.avg_duration || 0)} 
            icon={Clock} 
            iconBgColor="bg-cyan-50" 
            iconColor="text-cyan-500" 
          />
          <StatsCard 
            label="AI Used" 
            value={stats?.ai_used || 0} 
            icon={Sparkles} 
            iconBgColor="bg-green-50" 
            iconColor="text-green-500" 
          />
          <StatsCard 
            label="Last Session" 
            value={safeFormatDate(stats?.last_session, 'MMM d, yyyy')} 
            icon={Calendar} 
            iconBgColor="bg-purple-50" 
            iconColor="text-purple-500" 
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-center text-gray-800">Recent calls</h3>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm min-h-[300px] flex flex-col items-center justify-center">
            {isEmpty ? (
              <div className="text-center space-y-4 max-w-sm">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <CalendarDays size={24} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">No Recent Calls</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
                </p>
                <button className="mt-4 px-6 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Start a Call
                </button>
              </div>
            ) : (
              <div className="w-full overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="pb-4 font-semibold text-gray-600 text-sm">Session ID</th>
                      <th className="pb-4 font-semibold text-gray-600 text-sm">Date</th>
                      <th className="pb-4 font-semibold text-gray-600 text-sm">Duration</th>
                      <th className="pb-4 font-semibold text-gray-600 text-sm">AI Used</th>
                      <th className="pb-4 font-semibold text-gray-600 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {calls.map((call) => (
                      <tr key={call.id || Math.random()} className="group hover:bg-gray-50 transition-colors">
                        <td className="py-4 text-sm font-medium text-gray-900">#{call.id ? call.id.slice(0, 8) : 'N/A'}</td>
                        <td className="py-4 text-sm text-gray-500">{safeFormatDate(call.created_at, 'MMM d, HH:mm')}</td>
                        <td className="py-4 text-sm text-gray-500">{formatDuration(call.duration || 0)}</td>
                        <td className="py-4 text-sm text-gray-500">
                          {call.ai_used ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <Sparkles size={14} /> Yes
                            </span>
                          ) : 'No'}
                        </td>
                        <td className="py-4 text-sm">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            call.status === 'completed' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          )}>
                            {call.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
