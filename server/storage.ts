import { users, players, type User, type InsertUser, type Player, type InsertPlayer } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllPlayers(): Promise<Player[]>;
  getPlayer(id: number): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  seedPlayersFromRanking(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private players: Map<number, Player>;
  currentUserId: number;
  currentPlayerId: number;

  constructor() {
    this.users = new Map();
    this.players = new Map();
    this.currentUserId = 1;
    this.currentPlayerId = 1;
    this.seedPlayersFromRanking();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.players.values()).sort((a, b) => a.ranking - b.ranking);
  }

  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.currentPlayerId++;
    const player: Player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }

  async seedPlayersFromRanking(): Promise<void> {
    // Data extracted from Ranking_Actualizado table in ProyectoFantasy.ipynb.py
    const rankingData = [
      { ranking: 1, jugador: "Jannik Sinner", pais: "ITA", cotizacion: 60000 },
      { ranking: 2, jugador: "Carlos Alcaraz", pais: "ESP", cotizacion: 60000 },
      { ranking: 3, jugador: "Alexander Zverev", pais: "GER", cotizacion: 60000 },
      { ranking: 4, jugador: "Taylor Fritz", pais: "USA", cotizacion: 60000 },
      { ranking: 5, jugador: "Jack Draper", pais: "GBR", cotizacion: 30000 },
      { ranking: 6, jugador: "Daniil Medvedev", pais: "RUS", cotizacion: 30000 },
      { ranking: 7, jugador: "Andrey Rublev", pais: "RUS", cotizacion: 30000 },
      { ranking: 8, jugador: "Casper Ruud", pais: "NOR", cotizacion: 30000 },
      { ranking: 9, jugador: "Alex de Minaur", pais: "AUS", cotizacion: 30000 },
      { ranking: 10, jugador: "Grigor Dimitrov", pais: "BUL", cotizacion: 30000 },
    ];

    for (const playerData of rankingData) {
      await this.createPlayer(playerData);
    }
  }
}

export const storage = new MemStorage();
