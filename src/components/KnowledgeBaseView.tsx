import React from 'react';
import { BookOpen, Search, Filter, Plus, FileText, ExternalLink } from 'lucide-react';

export const KnowledgeBaseView: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage and search through your meeting resources</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
            <Plus size={18} />
            <span>Add Resource</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen size={20} />
            </div>
            <h3 className="font-bold text-gray-900">Recently Added</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 sm:p-6 hover:bg-gray-50/50 transition-colors group flex items-start sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100">
                    <FileText size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">Product Specification v{i}.0</h4>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 font-medium">
                      <span>PDF • 2.4 MB</span>
                      <span>Added 2 hours ago</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-black transition-colors rounded-lg hover:bg-white border border-transparent hover:border-gray-100">
                  <ExternalLink size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
