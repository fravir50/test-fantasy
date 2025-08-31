import React from 'react';
import { Trophy, Users, Target, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <header className="bg-gray-900/90 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                TennisVerse
              </h1>
              <p className="text-xs text-gray-400">Fantasy ATP Tour</p>
            </div>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                    currentView === item.id
                      ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/25'
                      : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};