import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PhoneCall, 
  BookOpen, 
  Terminal, 
  Settings, 
  History, 
  MessageSquare, 
  AlertCircle,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: PhoneCall, label: 'Call Insights', id: 'insights' },
  { icon: BookOpen, label: 'Knowledge Base', id: 'kb', alert: true },
  { icon: Terminal, label: 'Prompts', id: 'prompts', alert: true },
  { icon: Settings, label: 'Boxy Controls', id: 'controls', alert: true },
];

const footerItems = [
  { icon: History, label: 'Feedback History', id: 'feedback-history' },
  { icon: MessageSquare, label: 'Feedback', id: 'feedback' },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Hintro</h1>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === item.id 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span>{item.label}</span>
              </div>
              {item.alert && <AlertCircle size={14} className="text-gray-400" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-4 border-t border-gray-100">
          <div className="space-y-1">
            {footerItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeTab === item.id 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors">
            <span>Upgrade</span>
          </button>
        </div>
      </div>
    </>
  );
};
