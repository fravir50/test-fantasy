import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scrapeAtpRankings } from "./scraping";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Players API routes - fetch live data from tennisabstract.com
  app.get("/api/players", async (req, res) => {
    try {
      console.log('Fetching live ATP rankings from tennisabstract.com...');
      const players = await scrapeAtpRankings();
      console.log(`Successfully fetched ${players.length} players`);
      res.json(players);
    } catch (error) {
      console.error('Failed to scrape ATP rankings:', error);
      res.status(500).json({ error: "Failed to fetch live ATP rankings" });
    }
  });

  app.get("/api/players/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const player = await storage.getPlayer(id);
      if (!player) {
        return res.status(404).json({ error: "Player not found" });
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch player" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
