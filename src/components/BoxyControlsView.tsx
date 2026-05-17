import React, { useState } from 'react';
import { Shield, Cpu, Bell, Bot } from 'lucide-react';

export const BoxyControlsView: React.FC = () => {
  const [settings, setSettings] = useState({
    autoSummarize: true,
    realtimeInsights: false,
    privacyMode: true,
    notifications: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Boxy Controls</h1>
          <p className="text-gray-500 mt-1 text-sm">Fine-tune your Hintro assistant's performance</p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div className="p-6 sm:p-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Auto-Summarization</h4>
                <p className="text-xs text-gray-500 font-medium">Automatically generate summaries after every call</p>
              </div>
            </div>
            <button 
              onClick={() => toggle('autoSummarize')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoSummarize ? 'bg-black' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoSummarize ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 sm:p-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center">
                <Cpu size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Real-time Insights</h4>
                <p className="text-xs text-gray-500 font-medium">Process and show insights during the meeting</p>
              </div>
            </div>
            <button 
              onClick={() => toggle('realtimeInsights')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.realtimeInsights ? 'bg-black' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.realtimeInsights ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="p-6 sm:p-8 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <Shield size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-gray-900">Privacy Mode</h4>
                <p className="text-xs text-gray-500 font-medium">Redact sensitive information from transcripts</p>
              </div>
            </div>
            <button 
              onClick={() => toggle('privacyMode')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.privacyMode ? 'bg-black' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.privacyMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="bg-indigo-50/50 rounded-3xl p-6 sm:p-8 border border-indigo-100/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Bell className="text-indigo-400" size={20} />
             <p className="text-sm font-bold text-indigo-900">Email notifications enabled</p>
          </div>
          <button className="text-xs font-bold text-indigo-600 hover:underline">Configure</button>
        </div>
      </div>
    </div>
  );
};
