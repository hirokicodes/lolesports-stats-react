import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { useQuery } from "react-query";
import { PageLayout } from "../../../layouts/PageLayout";
import { AppAPI } from "../../../api";
import { Icon } from "../../../components/Icon";
import { QueryResult } from "../../../api/types";

interface Props {
  gameId: string;
}

interface PlayersAndGameData {
  gameData: GameData;
  playersData: PlayerData[];
}

interface GameData {
  Team1: string;
  Team2: string;
  WinTeam: string;
  LossTeam: string;
  "DateTime UTC": string;
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
  MatchHistory: string;
  VOD: string;
  Team1Ban1: string;
  Team1Ban2: string;
  Team1Ban3: string;
  Team1Ban4: string;
  Team1Ban5: string;
  Team1Pick1: string;
  Team1Pick2: string;
  Team1Pick3: string;
  Team1Pick4: string;
  Team1Pick5: string;
  Team2Ban1: string;
  Team2Ban2: string;
  Team2Ban3: string;
  Team2Ban4: string;
  Team2Ban5: string;
  Team2Pick1: string;
  Team2Pick2: string;
  Team2Pick3: string;
  Team2Pick4: string;
  Team2Pick5: string;
  Team1PicksByRoleOrder: string;
  Team2PicksByRoleOrder: string;
  Phase: string;
  UniqueLine: string;
  "DateTime UTC__precision": number;
}

export interface PlayerData {
  Name: string;
  Champion: string;
  Kills: number;
  Deaths: number;
  Assists: number;
  SummonerSpells: string[];
  Gold: number;
  CS: number;
  Items: string[];
  Trinket: string;
  KeystoneMastery: string;
  KeystoneRune: string;
  PrimaryTree: string;
  Runes: string;
  TeamKills: number;
  TeamGold: number;
  Team: string;
  Role: string;
}

const runeToTreeMap = {
  Overheal: "Precision",
  Triumph: "Precision",
  "Presence of Mind": "Precision",
  "Legend: Alacrity": "Precision",
  "Legend: Bloodline": "Precision",
  "Legend: Tenacity": "Precision",
  "Coup de Grace": "Precision",
  "Cut Down": "Precision",
  "Last Stand": "Precision",
  "Cheap Shot": "Domination",
  "Taste of Blood": "Domination",
  "Sudden Impact": "Domination",
  "Zombie Ward": "Domination",
  "Ghost Poro": "Domination",
  "Eyeball Collection": "Domination",
  "Ravenous Hunter": "Domination",
  "Ingenious Hunter": "Domination",
  "Relentless Hunter": "Domination",
  "Ultimate Hunter": "Domination",
  "Nullifying Orb": "Sorcery",
  "Manaflow Band": "Sorcery",
  "Nimbus Cloak": "Sorcery",
  Transcendence: "Sorcery",
  Celerity: "Sorcery",
  "Absolute Focus": "Sorcery",
  Scorch: "Sorcery",
  Waterwalking: "Sorcery",
  "Gathering Storm": "Sorcery",
  Demolish: "Resolve",
  "Font of Life": "Resolve",
  "Shield Bash": "Resolve",
  Conditioning: "Resolve",
  "Second Wind": "Resolve",
  "Bone Plating": "Resolve",
  Overgrowth: "Resolve",
  Revitalize: "Resolve",
  Unflinching: "Resolve",
  "Hextech Flashtraption": "Inspiration",
  "Magical Footwear": "Inspiration",
  "Perfect Timing": "Inspiration",
  "Future's Market": "Inspiration",
  "Minion Dematerializer": "Inspiration",
  "Biscuit Delivery": "Inspiration",
  "Cosmic Insight": "Inspiration",
  "Approach Velocity": "Inspiration",
  "Time Warp Tonic": "Inspiration",
};

export const Game: React.FC<Props> = ({ gameId }) => {
  async function getGameData() {
    const data = await AppAPI.getRoute(`/games/${encodeURIComponent(gameId)}`);
    return data;
  }

  const { isLoading, isError, data, error }: QueryResult<PlayersAndGameData> =
    useQuery(`games/${gameId}`, getGameData);

  let content = null;
  if (isLoading) {
    content = <div>loading...</div>;
  }
  if (isError) {
    content = <div>error</div>;
  }
  if (data) {
    const gameData = data.gameData;
    const playersData = data.playersData;
    content = (
      <div className="flex flex-col text-center">
        <div className="flex">
          <div className="w-1/4">{gameData["DateTime UTC"]}</div>
          <div className="w-1/4">Patch {gameData.Patch}</div>
          <div className="w-1/4">{gameData.Gamelength}</div>
          <a
            className="w-1/4 text-blue-600 hover:text-blue-400"
            href={gameData.MatchHistory}
          >
            Match History
          </a>
        </div>
        <div className="flex">
          <div className="w-1/2">{gameData.Team1}</div>
          <div className="w-1/2">{gameData.Team2}</div>
        </div>
        <div className="flex flex-grow">
          <div className="w-1/4">
            <Icon path="scoreboard-icons/gold.png" />
            {gameData.Team1Gold}
          </div>
          <div className="w-1/4">
            <Icon path="scoreboard-icons/kills.png" />
            {gameData.Team1Kills}
          </div>
          <div className="w-1/4">
            <Icon path="scoreboard-icons/kills.png" />
            {gameData.Team2Kills}
          </div>
          <div className="w-1/4">
            <Icon path="scoreboard-icons/gold.png" />
            {gameData.Team2Gold}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex flex-col">
            {[...Array(5)].map((e, i) => {
              const playerData = playersData[i];
              const runes = playerData.Runes.split(",");
              return (
                <div key={i} className="flex">
                  <div className="w-1/5">
                    <div className="grid-cols-3">
                      {playerData.Items.map((item, i) => {
                        return <Icon key={i} path={`item-icons/${item}.png`} />;
                      })}
                    </div>
                  </div>
                  <div className="w-3/5 flex flex-col">
                    <div className="text-blue-500">{playerData.Name}</div>
                    <div className="flex">
                      <div className="w-1/6">
                        <Icon path={`item-icons/${playerData.Trinket}.png`} />
                      </div>
                      <div className="w-2/6">
                        <Icon path="scoreboard-icons/gold.png" />
                        {playerData.Gold}
                      </div>
                      <div className="w-2/6">
                        {playerData.CS}
                        <span>cs</span>
                      </div>
                      <div className="w-1/6">
                        {playerData.Kills}/{playerData.Deaths}/
                        {playerData.Assists}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/10 flex flex-col">
                    <div>
                      <Icon
                        path={`rune-icons/${playerData.KeystoneRune.replace(
                          / /g,
                          ""
                        ).toLowerCase()}.png`}
                      />
                    </div>
                    <div>
                      <Icon
                        path={`rune-icons/${
                          runeToTreeMap[runes[4] as keyof typeof runeToTreeMap]
                        }.png`}
                      />
                    </div>
                  </div>
                  <div className="w-1/10 flex flex-col">
                    <Icon
                      width={8}
                      height={8}
                      backgroundSize={36}
                      path={`champion-icons/${playerData.Champion}.png`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-1/2 flex flex-col">
            {[...Array(5)].map((e, i) => {
              i = i + 5;
              const playerData = playersData[i];
              const runes = playerData.Runes.split(",");
              return (
                <div key={i} className="flex">
                  <div className="w-1/10 flex flex-col">
                    <Icon
                      width={8}
                      height={8}
                      backgroundSize={36}
                      path={`champion-icons/${playerData.Champion}.png`}
                    />
                  </div>
                  <div className="w-1/10 flex flex-col">
                    <div>
                      <Icon
                        path={`rune-icons/${playerData.KeystoneRune.replace(
                          / /g,
                          ""
                        ).toLowerCase()}.png`}
                      />
                    </div>
                    <div>
                      <Icon
                        path={`rune-icons/${
                          runeToTreeMap[runes[4] as keyof typeof runeToTreeMap]
                        }.png`}
                      />
                    </div>
                  </div>

                  <div className="w-3/5 flex flex-col ">
                    <div className="text-blue-500">{playerData.Name}</div>
                    <div className="flex">
                      <div className="w-1/6">
                        {playerData.Kills}/{playerData.Deaths}/
                        {playerData.Assists}
                      </div>
                      <div className="w-2/6">
                        {playerData.CS}
                        <span className="">cs</span>
                      </div>
                      <div className="w-2/6">
                        <Icon path="scoreboard-icons/gold.png" />
                        {playerData.Gold}
                      </div>

                      <div className="w-1/6">
                        <Icon path={`item-icons/${playerData.Trinket}.png`} />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5">
                    <div className="grid-cols-3">
                      {playerData.Items.map((item, i) => {
                        return <Icon key={i} path={`item-icons/${item}.png`} />;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="w-full max-w-3xl self-center text-textMain">
        {content}
      </div>
    </PageLayout>
  );
};
