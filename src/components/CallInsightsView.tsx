import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getCallStats, getCallHistory } from '../services/api';
import type { CallStats, CallSession } from '../types';
import { BarChart3, TrendingUp, Users2, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export const CallInsightsView: React.FC = () => {
  const { userId } = useUser();
  const [stats, setStats] = useState<CallStats | null>(null);
  const [calls, setCalls] = useState<CallSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const [statsData, callsData] = await Promise.all([
          getCallStats(userId),
          getCallHistory(userId, 10)
        ]);
        setStats(statsData);
        setCalls(Array.isArray(callsData) ? callsData : []);
      } catch (error) {
        console.error('Error fetching insights:', error);
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

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Call Insights</h1>
          <p className="text-gray-500 mt-1">Detailed analysis of your recent meeting performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <h4 className="font-bold text-gray-900">Meeting Trends</h4>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{stats?.total_sessions || 0}</p>
              <p className="text-xs text-gray-500">Total sessions analyzed</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <Activity size={20} />
              </div>
              <h4 className="font-bold text-gray-900">AI Efficiency</h4>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{stats?.ai_sessions || 0}</p>
              <p className="text-xs text-gray-500">Meetings enhanced by AI</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <BarChart3 size={20} />
              </div>
              <h4 className="font-bold text-gray-900">Avg. Duration</h4>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((stats?.avg_duration || 0) / 60)}m
              </p>
              <p className="text-xs text-gray-500">Average call length</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Analysis</h3>
          {calls.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No calls analyzed yet.</div>
          ) : (
            <div className="space-y-4">
              {calls.map((call) => (
                <div key={call.id} className="flex items-center justify-between p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                      <Users2 size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Session #{call.id.slice(0, 8)}</p>
                      <p className="text-xs text-gray-500">{new Date(call.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      call.ai_used ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                    )}>
                      {call.ai_used ? 'AI Processed' : 'Manual'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
