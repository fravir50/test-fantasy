import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { mockUsers } from '../data/users';

export const Leaderboard: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  const sortedUsers = [...mockUsers].sort((a, b) => {
    switch (timeFrame) {
      case 'weekly':
        return b.weeklyScore - a.weeklyScore;
      case 'monthly':
        return b.totalScore - a.totalScore; // Simplified for demo
      case 'all':
        return b.totalScore - a.totalScore;
      default:
        return 0;
    }
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getScore = (user: typeof mockUsers[0]) => {
    switch (timeFrame) {
      case 'weekly':
        return user.weeklyScore;
      case 'monthly':
        return Math.floor(user.totalScore * 0.3); // Simplified for demo
      case 'all':
        return user.totalScore;
      default:
        return user.totalScore;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Trophy className="w-8 h-8 text-cyan-400" />
              <span>Global Leaderboard</span>
            </h1>
            <p className="text-gray-400 mt-1">Compete with fantasy tennis managers worldwide</p>
          </div>
          
          <div className="flex space-x-2">
            {['weekly', 'monthly', 'all'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeFrame(period as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  timeFrame === period
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                    : 'bg-gray-700/50 border border-gray-600/50 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-2xl font-bold text-white">12,847</p>
              <p className="text-cyan-400 text-sm">Active Managers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">$2.5M</p>
              <p className="text-purple-400 text-sm">Total Prize Pool</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">847</p>
              <p className="text-green-400 text-sm">Tournaments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700/50">
          <h2 className="text-xl font-bold text-white">Rankings</h2>
        </div>
        
        <div className="divide-y divide-gray-700/30">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            const score = getScore(user);
            const isCurrentUser = user.id === 1;
            
            return (
              <div 
                key={user.id} 
                className={`p-6 hover:bg-gray-700/20 transition-all duration-300 ${
                  isCurrentUser ? 'bg-cyan-500/10 border-l-4 border-cyan-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(rank)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-bold ${isCurrentUser ? 'text-cyan-400' : 'text-white'}`}>
                          {user.username}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded border border-cyan-500/30">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">
                        {user.team.length} players • Team value: ${(score * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      rank === 1 ? 'text-yellow-400' :
                      rank === 2 ? 'text-gray-300' :
                      rank === 3 ? 'text-amber-600' :
                      'text-white'
                    }`}>
                      {score.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {timeFrame === 'weekly' ? 'Weekly' : timeFrame === 'monthly' ? 'Monthly' : 'Total'} Score
                    </p>
                  </div>
                </div>
                
                {/* Team Preview */}
                <div className="mt-4 flex items-center space-x-2">
                  <span className="text-xs text-gray-400">Team:</span>
                  <div className="flex -space-x-2">
                    {user.team.slice(0, 5).map((player) => (
                      <img
                        key={player.id}
                        src={player.image}
                        alt={player.name}
                        className="w-8 h-8 rounded-full border-2 border-gray-800 object-cover"
                        title={player.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};