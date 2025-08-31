import { User } from '../types';
import { atpPlayers } from './players';

export const mockUsers: User[] = [
  {
    id: 1,
    username: "TennisLegend_2025",
    totalScore: 8950,
    rank: 1,
    team: [atpPlayers[0], atpPlayers[1], atpPlayers[3], atpPlayers[4], atpPlayers[6]],
    weeklyScore: 1240
  },
  {
    id: 2,
    username: "CourtMaster",
    totalScore: 8720,
    rank: 2,
    team: [atpPlayers[1], atpPlayers[2], atpPlayers[5], atpPlayers[7], atpPlayers[8]],
    weeklyScore: 1185
  },
  {
    id: 3,
    username: "AceCollector",
    totalScore: 8510,
    rank: 3,
    team: [atpPlayers[2], atpPlayers[3], atpPlayers[4], atpPlayers[9], atpPlayers[10]],
    weeklyScore: 1156
  },
  {
    id: 4,
    username: "NetRushPro",
    totalScore: 8290,
    rank: 4,
    team: [atpPlayers[0], atpPlayers[5], atpPlayers[7], atpPlayers[8], atpPlayers[11]],
    weeklyScore: 1089
  },
  {
    id: 5,
    username: "GrandSlamHunter",
    totalScore: 8150,
    rank: 5,
    team: [atpPlayers[1], atpPlayers[4], atpPlayers[6], atpPlayers[9], atpPlayers[11]],
    weeklyScore: 1034
  }
];