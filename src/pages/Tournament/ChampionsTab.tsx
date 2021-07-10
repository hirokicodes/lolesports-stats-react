import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { ChampionsData, PickOrBan, ScoreboardGame } from "./types";

interface Props {
  tournamentChampionsData: ChampionsData;
}

export const ChampionsTab: React.FC<Props> = ({ tournamentChampionsData }) => {
  console.log(tournamentChampionsData);
  const [championList, setChampionList] = useState<string[]>([]);

  function sortAlphabetically() {
    const sortedData = Object.keys(tournamentChampionsData).sort();
    setChampionList(sortedData);
  }

  function sortByPickRate() {
    const sortedData = Object.keys(tournamentChampionsData).sort((a, b) => {
      if (tournamentChampionsData[a].Picks > tournamentChampionsData[b].Picks) {
        return -1;
      } else if (
        tournamentChampionsData[a].Picks < tournamentChampionsData[b].Picks
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    setChampionList(sortedData);
  }

  function sortByBanRate() {
    const sortedData = Object.keys(tournamentChampionsData).sort((a, b) => {
      if (tournamentChampionsData[a].Bans > tournamentChampionsData[b].Bans) {
        return -1;
      } else if (
        tournamentChampionsData[a].Bans < tournamentChampionsData[b].Bans
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    setChampionList(sortedData);
  }

  function sortByTotalGames() {
    const sortedData = Object.keys(tournamentChampionsData).sort((a, b) => {
      if (
        tournamentChampionsData[a].Picks + tournamentChampionsData[a].Bans >
        tournamentChampionsData[b].Picks + tournamentChampionsData[b].Bans
      ) {
        return -1;
      } else if (
        tournamentChampionsData[a].Picks + tournamentChampionsData[a].Bans <
        tournamentChampionsData[b].Picks + tournamentChampionsData[b].Bans
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    setChampionList(sortedData);
  }

  useEffect(() => {
    sortAlphabetically();
  }, []);

  return (
    <div>
      <div className="md:px-32 py-8 w-full">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th
                  onClick={sortAlphabetically}
                  className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  Champion
                </th>
                <th
                  onClick={sortByPickRate}
                  className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  Pick
                </th>
                <th
                  onClick={sortByBanRate}
                  className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  Ban
                </th>
                <th
                  onClick={sortByTotalGames}
                  className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm"
                >
                  Total Games
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {championList.map((champion, i) => {
                return (
                  <tr key={i}>
                    <td className="w-1/4 text-left py-3 px-4">{champion}</td>
                    <td className="w-1/4 text-left py-3 px-4">
                      {tournamentChampionsData[champion].Picks}
                    </td>
                    <td className="w-1/4 text-left py-3 px-4">
                      {tournamentChampionsData[champion].Bans}
                    </td>
                    <td className="w-1/4 text-left py-3 px-4">
                      {tournamentChampionsData[champion].Bans +
                        tournamentChampionsData[champion].Picks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
