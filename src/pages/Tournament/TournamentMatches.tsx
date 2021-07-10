import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  Link,
  RouteComponentProps,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { AppAPI } from "../../api";
import { MatchSchedule } from "./types";

interface Props {
  tournamentName: string;
}

export const TournamentMatches: React.FC<Props> = ({ tournamentName }) => {
  let location = useLocation();
  const { path, url } = useRouteMatch();
  console.log(path, url);
  const { isLoading, isError, data, error } = useQuery(
    `${tournamentName}-matches`,
    getMatchesData
  );

  async function getMatchesData() {
    console.log(tournamentName);
    const matchesData = await AppAPI.getRoute(
      `/tournaments/${tournamentName}/matches`
    );
    console.log(matchesData);
    return matchesData;
  }
  let content = null;
  if (isLoading) {
    content = <div>loading...</div>;
  }
  if (isError) {
    content = <div>error...</div>;
  }
  if (data) {
    content = (
      <div>
        {data.map((matchData: MatchSchedule, i: number) => {
          const {
            Team1,
            Team2,
            "DateTime UTC": DateTime_UTC,
            Team1Score,
            Team2Score,
          } = matchData;
          let backgroundColor = "bg-gray-100";
          if (Team1Score > Team2Score) {
            backgroundColor = "bg-blue-100";
          } else if (Team2Score > Team1Score) {
            backgroundColor = "bg-red-100";
          }
          return (
            <Link
              to={{
                pathname: `/matches/${encodeURIComponent(matchData.MatchId)}`,
                state: { background: location, prevPath: location.pathname },
              }}
              key={matchData.MatchId}
            >
              <div className={`m-1 p-1 flex flex-col ${backgroundColor}`}>
                <div className="flex flex-row w-full">
                  <div className="text-xl w-2/6 ">{Team1}</div>
                  <div className="text-xl text-center flex-grow">
                    {Team1Score || "0"} : {Team2Score || "0"}
                  </div>

                  <div className="text-xl w-2/6 text-right">{Team2}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div></div>
                  <div className="text-right">{DateTime_UTC}</div>
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
