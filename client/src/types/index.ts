export interface Player {
  id: number;
  name: string;
  country: string;
  atpRanking: number;
  points: number;
  age: number;
  prize: number;
  recentForm: number[];
  image: string;
}

export interface RankingPlayer {
  id: number;
  ranking: number;
  jugador: string;
  pais: string;
  cotizacion: number;
}

export interface User {
  id: number;
  username: string;
  totalScore: number;
  rank: number;
  team: Player[];
  weeklyScore: number;
}

export interface Tournament {
  id: number;
  name: string;
  location: string;
  date: string;
  surface: 'Hard' | 'Clay' | 'Grass';
  points: number;
}