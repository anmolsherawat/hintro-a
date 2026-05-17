import React from 'react';
import { useUser } from '../context/UserContext';
import { User, LogIn, Sparkles } from 'lucide-react';

export const AuthView: React.FC = () => {
  const { setUserId } = useUser();

  const handleLogin = (id: string) => {
    setUserId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to Hintro</h1>
          <p className="text-gray-500 font-medium">Select a user to continue to your dashboard</p>
        </div>

        <div className="grid gap-4">
          <button
            onClick={() => handleLogin('u2')}
            className="group relative flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-lg transition-all text-left"
          >
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <User size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Active User (u2)</p>
              <p className="text-xs text-gray-500">View dashboard with populated data</p>
            </div>
            <LogIn size={20} className="text-gray-300 group-hover:text-black transition-colors" />
          </button>

          <button
            onClick={() => handleLogin('u1')}
            className="group relative flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-lg transition-all text-left"
          >
            <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <User size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">New User (u1)</p>
              <p className="text-xs text-gray-500">Experience the empty state flow</p>
            </div>
            <LogIn size={20} className="text-gray-300 group-hover:text-black transition-colors" />
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Hintro Dashboard • Developer Assessment
        </p>
      </div>
    </div>
  );
};
