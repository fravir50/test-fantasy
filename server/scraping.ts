import axios from 'axios';
import * as cheerio from 'cheerio';
import { Player } from '@shared/schema';

export async function scrapeAtpRankings(): Promise<Player[]> {
  try {
    const url = "https://tennisabstract.com/reports/atpRankings.html";
    
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    };
    
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    // Find the ranking table
    const players: Player[] = [];
    const table = $('#reportable');
    
    if (!table.length) {
      throw new Error('Could not find ranking table on the page');
    }
    
    // Skip header row, process data rows
    table.find('tr').slice(1).each((index, row) => {
      const cells = $(row).find('td');
      
      if (cells.length < 4) {
        return; // Skip incomplete rows
      }
      
      const ranking = parseInt($(cells[0]).text().trim());
      const playerLink = $(cells[1]).find('a');
      const jugador = playerLink.text().trim().replace(/\u00A0/g, ' '); // Handle &nbsp;
      const pais = $(cells[2]).text().trim();
      
      if (!jugador || !pais || isNaN(ranking)) {
        return; // Skip invalid data
      }
      
      // Apply cotización logic from Python notebook
      const cotizacion = determinarCotizacion(ranking);
      
      players.push({
        id: ranking, // Use ranking as ID for simplicity
        ranking,
        jugador,
        pais,
        cotizacion
      });
    });
    
    return players.slice(0, 200); // Limit to top 200 like in Python
  } catch (error) {
    console.error('Error scraping ATP rankings:', error);
    throw new Error('Failed to fetch live ATP rankings data');
  }
}

function determinarCotizacion(ranking: number): number {
  if (ranking <= 4) {
    return 60000;
  } else if (ranking <= 10) {
    return 30000;
  } else if (ranking <= 20) {
    return 20000;
  } else if (ranking <= 30) {
    return 12000;
  } else if (ranking <= 50) {
    return 5000;
  } else if (ranking <= 100) {
    return 3000;
  } else {
    return 1000;
  }
}