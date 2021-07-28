import React from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { AppAPI } from "../../api";
import { Icon } from "../../components/Icon";

interface Props {
  tournamentName: string;
}

export const TournamentGames: React.FC<Props> = ({ tournamentName }) => {
  let location = useLocation();
  const { path, url } = useRouteMatch();
  console.log(path, url);
  const { isLoading, isError, data, error } = useQuery(
    `${tournamentName}-games`,
    getGamesData
  );

  async function getGamesData() {
    console.log(tournamentName);
    const gamesData = await AppAPI.getRoute(
      `/tournaments/${tournamentName}/games`
    );
    console.log(gamesData);
    return gamesData;
  }
  let content = null;
  if (isLoading) {
    content = <div>loading...</div>;
  }
  if (isError) {
    content = <div>error...</div>;
  }
  if (data) {
    console.log(data);
    content = (
      <div>
        {data.map((gameData: any, i: number) => {
          const {
            Team1,
            Team2,
            Team1Bans,
            Team2Bans,
            Team1Picks,
            Team2Picks,
            Team1Players,
            Team2Players,
            "DateTime UTC": DateTime_UTC,
            Winner,
          } = gameData;
          let backgroundColor = "bg-gray-100";
          let hoveredBackgroundColor = "bg-gray-200";
          if (Winner === 1) {
            backgroundColor = "bg-blue-100";
            hoveredBackgroundColor = "bg-blue-200";
          } else if (Winner === 2) {
            backgroundColor = "bg-red-100";
            hoveredBackgroundColor = "bg-red-200";
          }
          return (
            <Link
              to={{
                pathname: `/matches/${encodeURIComponent(
                  gameData.MatchId
                )}/game/${gameData.GameId[gameData.GameId.length - 1]}`,
                state: { background: location, prevPath: location.pathname },
              }}
              key={gameData.GameId}
            >
              <div
                className={`m-1 p-1 flex ${backgroundColor} hover:${hoveredBackgroundColor}`}
              >
                <div className="flex flex-col w-full items-center">
                  <div className="w-full flex items-center">
                    <div className="w-1/12 flex justify-center">Bans</div>
                    <div className="w-4/12 flex justify-center">{Team1}</div>
                    <div className="w-1/12 flex justify-center">Picks</div>
                    <div className="w-1/12 flex justify-center">Picks</div>
                    <div className="w-4/12 flex justify-center">{Team2}</div>
                    <div className="w-1/12 flex justify-center">Bans</div>
                  </div>
                  {[...Array(5)].map((_, i) => {
                    return (
                      <div key={i} className="w-full flex items-center">
                        <div className=" w-1/12 flex justify-center">
                          <Icon
                            width={"w-8"}
                            height={"h-8"}
                            path={`champion-icons/${Team1Bans[i]}.png`}
                          />
                        </div>
                        <div className="w-4/12 flex justify-center">
                          {Team1Players[i]}
                        </div>
                        <div className="w-1/12 flex justify-center">
                          <Icon
                            width={"w-8"}
                            height={"h-8"}
                            path={`champion-icons/${Team1Picks[i]}.png`}
                          />
                        </div>
                        <div className="w-1/12 flex justify-center">
                          <Icon
                            width={"w-8"}
                            height={"h-8"}
                            path={`champion-icons/${Team2Picks[i]}.png`}
                          />
                        </div>
                        <div className="w-4/12 flex justify-center">
                          {Team2Players[i]}
                        </div>
                        <div className="w-1/12 flex justify-center">
                          <Icon
                            width={"w-8"}
                            height={"h-8"}
                            path={`champion-icons/${Team2Bans[i]}.png`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return <div className="flex flex-col">{content}</div>;
};
