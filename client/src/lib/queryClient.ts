import { QueryClient } from '@tanstack/react-query';
import { RankingPlayer, Player } from '../types';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// Convert RankingPlayer from API to Player format for UI
export function convertRankingPlayerToPlayer(rankingPlayer: RankingPlayer): Player {
  return {
    id: rankingPlayer.id,
    name: rankingPlayer.jugador,
    country: rankingPlayer.pais,
    atpRanking: rankingPlayer.ranking,
    points: Math.floor(rankingPlayer.cotizacion / 10), // Convert cotizacion to points estimate
    age: 25, // Default age since not available in ranking data
    prize: rankingPlayer.cotizacion,
    recentForm: [85, 88, 82, 90, 86], // Default form since not available in ranking data
    image: "https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg" // Default image
  };
}