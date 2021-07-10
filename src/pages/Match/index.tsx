import React, { useState } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { PageLayout } from "../../layouts/PageLayout";
import { AppAPI } from "../../api";
import { useQuery } from "react-query";
import { Game } from "./Game";

export const Match: React.FC<RouteComponentProps<{ matchId: string }>> = ({
  match: {
    params: { matchId },
  },
}) => {
  let { path, url } = useRouteMatch();
  const [tabView, setTabView] = useState(getTabView());

  async function getMatchData() {
    const data = await AppAPI.getRoute(`/matches/${matchId}`);
    return data;
  }
  const { isLoading, isError, data, error } = useQuery(
    `matches/${matchId}`,
    getMatchData
  );

  function getTabView() {
    const url = window.location.href;
    const lastSegment = url.substring(url.lastIndexOf("/") + 1);
    if (lastSegment === matchId) {
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
    content = <div>{"content here"}</div>;
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
            onClick={() => setTabView(i + 1)}
            to={{
              pathname: `${url}/game/${i + 1}`,
            }}
          >
            {`Game ${i + 1}`}
          </Link>
        </li>
      );
    });
  }

  return (
    <PageLayout>
      <ul className="flex justify-center items-center my-4">
        <li>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === 0 ? "text-green-500 border-green-500" : ""
            }`}
            onClick={() => setTabView(0)}
            to={{
              pathname: `${url}`,
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
  );
};
