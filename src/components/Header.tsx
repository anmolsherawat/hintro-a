import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Play, User, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { LogoutModal } from './LogoutModal';
import { getProfile } from '../services/api';
import type { UserProfile } from '../types';

export const Header: React.FC = () => {
  const { userId, toggleUser, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      try {
        const data = await getProfile(userId);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
        <h2 className="text-xl font-semibold text-gray-800 ml-10 lg:ml-0">Dashboard</h2>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleUser}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Play size={16} className="text-gray-600 fill-current" />
            <span>Watch Tutorial</span>
          </button>

          <div className="flex items-center gap-2 sm:pl-4 sm:border-l border-gray-200 relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-full transition-colors hover:bg-gray-50"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                <User size={20} className="text-gray-500" />
              </div>
              <ChevronDown size={14} className={cn("text-gray-400 transition-transform", isMenuOpen && "rotate-180")} />
            </button>

            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Signed in as</p>
                   <p className="text-sm font-bold text-gray-900 truncate">{profile?.firstName} {profile?.lastName}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  <LogOut size={16} className="text-gray-400" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={confirmLogout} 
      />
    </>
  );
};
