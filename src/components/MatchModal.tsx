import React, { SyntheticEvent, useEffect, useState } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { useQuery } from "react-query";
import { PageLayout } from "../layouts/PageLayout";
import { Match } from "../pages/Match";
import { Game } from "../pages/Match/Game";
import { AppAPI } from "../api";

interface RouteParams {
  matchId: string;
}

interface LocationState {
  prevPath: string;
}

export interface MatchData {
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
  MatchId: string;
  "DateTime UTC__precision": number;
}

interface QueryResult {
  isLoading: boolean;
  isError: boolean;
  data?: MatchData;
  error: unknown;
}

export const MatchModal: React.FC = () => {
  let history = useHistory();
  let { path, url } = useRouteMatch();
  let location = useLocation();
  let { matchId } = useParams<RouteParams>();
  const prevPath = (location?.state as LocationState)?.prevPath || "";

  function goBack(event: SyntheticEvent) {
    event.stopPropagation();
    history.push(prevPath);
  }

  const [tabView, setTabView] = useState(getTabView());

  async function getMatchData() {
    const data = await AppAPI.getRoute(`/matches/${matchId}`);
    return data;
  }
  const { isLoading, isError, data, error }: QueryResult = useQuery(
    `matches/${matchId}`,
    getMatchData
  );

  function getTabView() {
    const url = window.location.href;
    const lastSegment = url.substring(url.lastIndexOf("/") + 1);
    const lastSegmentDecoded = decodeURIComponent(lastSegment);
    const matchIdDecoded = decodeURIComponent(matchId);
    if (lastSegmentDecoded === matchIdDecoded) {
      return 0;
    } else {
      return parseInt(lastSegment);
    }
  }

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  }
  if (isError) {
    content = <div>{error as any}</div>;
  }
  if (data) {
    content = (
      <div>
        {data.Team1} vs {data.Team2} - BO{data.BestOf}
      </div>
    );
  }
  let subroutes = null;

  if (data) {
    subroutes = [...Array(data.Team1Score + data.Team2Score)].map((e, i) => {
      return (
        <Route key={i} path={`${path}/game/${i + 1}`}>
          <Game gameId={`${matchId}_${i + 1}`} />
        </Route>
      );
    });
  }

  let tabs = null;
  if (data) {
    tabs = [...Array(data.Team1Score + data.Team2Score)].map((e, i) => {
      return (
        <li key={i}>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === i + 1 ? "text-green-500 border-green-500" : ""
            }`}
            onClick={(e) => {
              setTabView(i + 1);
            }}
            to={{
              pathname: `${url}/game/${i + 1}`,
              state: { background: location, prevPath },
            }}
          >
            {`Game ${i + 1}`}
          </Link>
        </li>
      );
    });
  }

  return (
    <div className="fixed z-30 inset-0 h-full">
      <div className="flex items-end justify-center h-full text-center">
        <div
          onClick={goBack}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 h-full"
        ></div>

        <div className="z-40 inline-block align-bottom bg-white rounded-lg text-left overflow-auto shadow-xl w-4/5  h-full ">
          <PageLayout>
            <ul className="flex justify-center items-center my-4">
              <li>
                <Link
                  className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
                    tabView === 0 ? "text-green-500 border-green-500" : ""
                  }`}
                  onClick={(e) => {
                    setTabView(0);
                  }}
                  to={{
                    pathname: `${url}`,
                    state: { background: location, prevPath },
                  }}
                >
                  Overview
                </Link>
              </li>
              {tabs}
            </ul>
            <Switch>
              <Route exact path={path}>
                <div className="w-full max-w-3xl self-center text-textMain">
                  {content}
                </div>
              </Route>
              {subroutes}
            </Switch>
          </PageLayout>
        </div>
      </div>
    </div>
  );
};
