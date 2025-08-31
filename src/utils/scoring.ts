import { Player } from '../types';

export const calculatePlayerScore = (player: Player): number => {
  const rankingBonus = Math.max(0, 100 - player.atpRanking * 2);
  const pointsBonus = Math.floor(player.points / 100);
  const formBonus = player.recentForm.reduce((acc, form) => acc + form, 0) / player.recentForm.length;
  
  return Math.floor(rankingBonus + pointsBonus + formBonus);
};

export const calculateTeamScore = (team: Player[]): number => {
  return team.reduce((total, player) => total + calculatePlayerScore(player), 0);
};

export const getPlayerFormTrend = (form: number[]): 'up' | 'down' | 'stable' => {
  if (form.length < 2) return 'stable';
  
  const recent = form.slice(-3);
  const earlier = form.slice(0, -3);
  
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
  
  if (recentAvg > earlierAvg + 3) return 'up';
  if (recentAvg < earlierAvg - 3) return 'down';
  return 'stable';
};