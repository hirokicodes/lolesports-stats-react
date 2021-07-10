export interface ScoreboardGame {
  Tournament: string;
  Team1: string;
  Team2: string;
  WinTeam: string;
  LossTeam: string;
  DST: string;
  Team1Score: number;
  Team2Score: number;
  Winner: number;
  Gamelength: string;
  "Gamelength Number": number;
  Team1Bans: string[];
  Team2Bans: string[];
  Team1Picks: string[];
  Team2Picks: string[];
  Team1Players: string[];
  Team2Players: string[];
  Team1Dragons: number;
  Team2Dragons: number;
  Team1Barons: number;
  Team2Barons: number;
  Team1Towers: number;
  Team2Towers: number;
  Team1Gold: number;
  Team2Gold: number;
  Team1Kills: number;
  Team2Kills: number;
  Team1RiftHeralds: number;
  Team2RiftHeralds: number;
  Team1Inhibitors: number;
  Team2Inhibitors: number;
  Patch: number;
  PatchSort: string;
  MatchHistory: string;
  VOD: string;
  "N Page": number;
  "N MatchInTab": string;
  "N MatchInPage": number;
  "N GameInMatch": number;
  Gamename: string;
  UniqueGame: string;
  UniqueLine: string;
  GameId: string;
  MatchId: string;
  "ScoreboardID Wiki": string;
  "ScoreboardID Riot": string;
  Note1: string;
  Note2: string;
  Note3: string;
  Note4: string;
}

export interface MatchSchedule {
  Team1: string;
  Team2: string;
  Winner: number;
  Team1Points: string;
  Team2Points: string;
  Team1PointsTB: string;
  Team2PointsTB: string;
  Team1Score: number;
  Team2Score: number;
  Team1Poster: string;
  Team2Poster: string;
  Team1Advantage: string;
  Team2Advantage: string;
  FF: string;
  Player1: string;
  Player2: string;
  MatchDay: number;
  "DateTime UTC": string;
  DST: string;
  BestOf: number;
  Round: string;
  Phase: string;
  Patch: number;
  MVP: string;
  OverviewPage: string;
  "DateTime UTC__precision": number;
  MatchId: string;
}

export interface ChampionsData {
  [key: string]: ChampionData;
}

export interface ChampionData {
  Bans: number;
  Team1Bans: number;
  Team2Bans: number;
  Picks: number;
  Team1Picks: number;
  Team2Picks: number;
  ScoreboardGames: ScoreboardGame[];
}

export enum PickOrBan {
  Team1Pick = "Team1Pick",
  Team2Pick = "Team2Pick",
  Team1Ban = "Team1Ban",
  Team2Ban = "Team2Ban",
}
