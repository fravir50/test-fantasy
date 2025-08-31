import React from 'react';
import { TrendingUp, TrendingDown, Minus, Star, Trophy, Calendar, Target } from 'lucide-react';
import { mockUsers } from '../data/users';
import { upcomingTournaments } from '../data/tournaments';
import { calculatePlayerScore, calculateTeamScore, getPlayerFormTrend } from '../utils/scoring';

export const Dashboard: React.FC = () => {
  const currentUser = mockUsers[0];
  const teamScore = calculateTeamScore(currentUser.team);
  const nextTournaments = upcomingTournaments.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-gradient">{currentUser.username}</span>
            </h1>
            <p className="text-gray-400">Ready to dominate the fantasy tennis world?</p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-float">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 hover:glow-cyan transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Score</p>
              <p className="text-2xl font-bold text-cyan-400">{currentUser.totalScore.toLocaleString()}</p>
            </div>
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400">+12.5% this week</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 hover:glow-purple transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Global Rank</p>
              <p className="text-2xl font-bold text-purple-400">#{currentUser.rank}</p>
            </div>
            <Star className="w-8 h-8 text-purple-400" />
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">Top 1% globally</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Weekly Score</p>
              <p className="text-2xl font-bold text-green-400">{currentUser.weeklyScore}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-sm text-green-400">+8.2% from last week</span>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-500/40 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Team Value</p>
              <p className="text-2xl font-bold text-orange-400">${(teamScore * 1000).toLocaleString()}</p>
            </div>
            <Star className="w-8 h-8 text-orange-400" />
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <span className="text-sm text-orange-400">5 active players</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Your Team */}
        <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-cyan-400" />
              <span>Your Championship Team</span>
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300">
              Manage Team
            </button>
          </div>
          
          <div className="space-y-4">
            {currentUser.team.map((player, index) => {
              const playerScore = calculatePlayerScore(player);
              const trend = getPlayerFormTrend(player.recentForm);
              
              return (
                <div key={player.id} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={player.image} 
                        alt={player.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30 group-hover:border-cyan-500/60 transition-all duration-300"
                      />
                      <div className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        #{player.atpRanking}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white truncate group-hover:text-cyan-400 transition-colors duration-300">
                          {player.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                          {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                          {trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                          <span className="text-sm font-bold text-cyan-400">+{playerScore}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">{player.country} • ${player.prize.toLocaleString()} prize</p>
                      
                      {/* Form Bars */}
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-xs text-gray-500 mr-2">Form:</span>
                        {player.recentForm.map((form, formIndex) => (
                          <div 
                            key={formIndex}
                            className={`w-3 h-2 rounded-full transition-all duration-300 ${
                              form >= 90 ? 'bg-green-400' :
                              form >= 80 ? 'bg-yellow-400' :
                              'bg-red-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            <span>Upcoming Events</span>
          </h2>
          
          <div className="space-y-4">
            {nextTournaments.map((tournament) => (
              <div key={tournament.id} className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{tournament.name}</h3>
                    <p className="text-sm text-gray-400">{tournament.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(tournament.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      tournament.surface === 'Hard' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      tournament.surface === 'Clay' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {tournament.surface}
                    </span>
                    <p className="text-sm text-cyan-400 font-bold mt-1">{tournament.points} pts</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-400 rounded-lg hover:from-purple-500/30 hover:to-cyan-500/30 hover:border-cyan-500/40 transition-all duration-300">
            View All Tournaments
          </button>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Team Performance Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-300">Weekly Progression</h3>
            <div className="space-y-3">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => {
                const score = 1240 - (3 - index) * 50 + Math.random() * 100;
                return (
                  <div key={week} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{week}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(score / 1500) * 100}%` }}
                        />
                      </div>
                      <span className="text-cyan-400 font-medium text-sm">{Math.floor(score)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-300">Achievement Unlocked</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-yellow-400 font-medium">Top 5 Finish</p>
                  <p className="text-xs text-gray-400">Finished in top 5 for 3 consecutive weeks</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Star className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-green-400 font-medium">Perfect Pick</p>
                  <p className="text-xs text-gray-400">All 5 players won their matches this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};