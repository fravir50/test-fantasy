import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, TrendingUp, TrendingDown, Minus, Star, Award } from 'lucide-react';
import { apiRequest, convertRankingPlayerToPlayer } from '../lib/queryClient';
import { calculatePlayerScore, getPlayerFormTrend } from '../utils/scoring';
import { RankingPlayer, Player } from '../types';

export const PlayersView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'ranking' | 'score' | 'form'>('ranking');

  // Fetch players from API
  const { data: rankingPlayers = [], isLoading, error } = useQuery<RankingPlayer[]>({
    queryKey: ['/api/players'],
    queryFn: () => apiRequest('/api/players'),
  });

  // Convert ranking players to UI format
  const players = rankingPlayers.map(convertRankingPlayerToPlayer);

  const filteredPlayers = players
    .filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'ranking':
          return a.atpRanking - b.atpRanking;
        case 'score':
          return calculatePlayerScore(b) - calculatePlayerScore(a);
        case 'form':
          const aForm = a.recentForm.reduce((acc, val) => acc + val, 0) / a.recentForm.length;
          const bForm = b.recentForm.reduce((acc, val) => acc + val, 0) / b.recentForm.length;
          return bForm - aForm;
        default:
          return 0;
      }
    });

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700/50 rounded-lg mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-700/50 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 text-center">
          <p className="text-red-400">Failed to load players. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search players or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
          >
            <option value="ranking">ATP Ranking</option>
            <option value="score">Fantasy Score</option>
            <option value="form">Recent Form</option>
          </select>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => {
          const playerScore = calculatePlayerScore(player);
          const trend = getPlayerFormTrend(player.recentForm);
          const avgForm = player.recentForm.reduce((acc, val) => acc + val, 0) / player.recentForm.length;
          
          return (
            <div key={player.id} className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img 
                    src={player.image} 
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 group-hover:border-cyan-500/50 transition-all duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-gray-900 border border-cyan-500/50 rounded-full px-2 py-1 text-xs font-bold text-cyan-400">
                    #{player.atpRanking}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors duration-300">
                    {player.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{player.country} • {player.age} years</p>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">
                      {playerScore} FPT
                    </span>
                    <span className="text-xs text-gray-500">{player.points.toLocaleString()} ATP</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-1">
                    {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                    {trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm text-gray-400">{avgForm.toFixed(1)}</span>
                  </div>
                  <button className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                    Add to Team
                  </button>
                </div>
              </div>
              
              {/* Form Chart */}
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <p className="text-xs text-gray-400 mb-2">Recent Form</p>
                <div className="flex items-end space-x-1 h-8">
                  {player.recentForm.map((form, index) => (
                    <div 
                      key={index}
                      className={`flex-1 rounded-t transition-all duration-300 ${
                        form >= 90 ? 'bg-green-400' :
                        form >= 80 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                      style={{ height: `${(form / 100) * 32}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};