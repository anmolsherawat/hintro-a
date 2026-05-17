import React, { useEffect, useState } from 'react';
import { PieChart, Clock, Sparkles, Calendar, CalendarDays } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { getProfile, getDashboard, getCallHistory } from '../services/api';
import type { UserProfile, DashboardStats, CallSession } from '../types';
import { StatsCard } from './StatsCard';
import { format, isValid, formatDistanceToNow } from 'date-fns';
import { CallItem } from './CallItem';

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

  const formatRelativeDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (!isValid(date)) return '-';
    return formatDistanceToNow(date, { addSuffix: true }).replace('about ', '');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileData, statsData, callsData] = await Promise.all([
          getProfile(userId),
          getDashboard(userId),
          getCallHistory(userId, 10)
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

  // Group calls by date
  const groupedCalls = calls.reduce((groups: { [key: string]: CallSession[] }, call) => {
    const date = safeFormatDate(call.created_at, 'MMMM do');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(call);
    return groups;
  }, {});

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
            value={`${stats?.ai_used || 0} times`} 
            icon={Sparkles} 
            iconBgColor="bg-green-50" 
            iconColor="text-green-500" 
          />
          <StatsCard 
            label="Last Session" 
            value={formatRelativeDate(stats?.last_session)} 
            icon={Calendar} 
            iconBgColor="bg-purple-50" 
            iconColor="text-purple-500" 
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-center text-gray-800">Recent calls</h3>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-[300px]">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
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
              </div>
            ) : (
              <div className="space-y-8 max-w-3xl mx-auto">
                {Object.entries(groupedCalls).map(([date, callsInGroup]) => (
                  <div key={date} className="space-y-4">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4">{date}</h4>
                    <div className="space-y-1">
                      {callsInGroup.map((call, index) => (
                        <CallItem 
                          key={call.id}
                          title={index % 2 === 0 ? "Design Call" : "Sales Call"}
                          time={safeFormatDate(call.created_at, 'h:mm aa')}
                          participantsCount={index % 3 + 1}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
