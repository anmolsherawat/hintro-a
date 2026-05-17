import React from 'react';
import { Terminal, Copy, Sparkles, MessageSquareCode, Zap } from 'lucide-react';

export const PromptsView: React.FC = () => {
  const prompts = [
    { title: "Meeting Summary", desc: "Generate a concise summary with action items.", icon: FileText },
    { title: "Technical Breakdown", desc: "Extract technical requirements and constraints.", icon: Zap },
    { title: "Sentiment Analysis", desc: "Analyze the tone and sentiment of the conversation.", icon: MessageSquareCode },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prompts</h1>
            <p className="text-gray-500 mt-1 text-sm">Configure AI behavior for your meeting analysis</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
            <Sparkles size={18} />
            <span>New Prompt</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {i === 0 ? <Terminal size={24} /> : i === 1 ? <Zap size={24} /> : <MessageSquareCode size={24} />}
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900">{p.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{p.desc}</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-black hover:text-white transition-all">
                <Copy size={14} />
                <span>Copy Prompt</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { FileText } from 'lucide-react';
