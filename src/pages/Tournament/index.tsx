import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { AppAPI } from "../../api";
import { PageLayout } from "../../layouts/PageLayout";
import { Champions } from "./Champions";
import { Standings } from "./Standings";
import { TournamentGames } from "./TournamentGames";
import { TournamentMatches } from "./TournamentMatches";

enum TabView {
  Overview = "",
  Matches = "matches",
  Standings = "standings",
  AllGames = "all-games",
  Champions = "champions",
}

export const Tournament: React.FC<RouteComponentProps<{ name: string }>> = ({
  match: {
    params: { name },
  },
}) => {
  let { path, url } = useRouteMatch();

  const [tournamentData, setTournamentData] = useState<any[]>([]);

  const [tabView, setTabView] = useState(getLastSegmentOfUrl());

  function getLastSegmentOfUrl() {
    const url = window.location.href;
    const lastSegment = url.substring(url.lastIndexOf("/") + 1);
    const nameDecoded = decodeURIComponent(name);
    const lastSegmentDecoded = decodeURIComponent(lastSegment);

    if (lastSegmentDecoded === nameDecoded) {
      return "";
    }
    return lastSegment;
  }

  async function getStandingsData() {
    console.log(name);
    const standingsData = await AppAPI.getRoute(
      `/tournaments/${name}/standings`
    );
    return standingsData;
  }

  async function getData() {
    console.log("getData begins");
    const data = await AppAPI.getRoute(
      `/tournaments/${encodeURIComponent(name)}/matches`
    );
    console.log("data: ", data);
    setTournamentData(data);
  }

  useEffect(() => {
    console.log("use eff");
    getData();
    getStandingsData();
  }, []);

  return (
    <PageLayout>
      <div className="w-full max-w-3xl self-center text-textMain">
        {decodeURIComponent(name)}
      </div>

      <ul className="flex justify-center items-center my-4">
        <li>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === TabView.Overview
                ? "text-green-500 border-green-500"
                : ""
            }`}
            onClick={() => setTabView(TabView.Overview)}
            to={`${url}`}
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === TabView.Matches
                ? "text-green-500 border-green-500"
                : ""
            }`}
            onClick={() => setTabView(TabView.Matches)}
            to={`${url}/matches`}
          >
            Matches
          </Link>
        </li>

        <li>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === TabView.AllGames
                ? "text-green-500 border-green-500"
                : ""
            }`}
            onClick={() => setTabView(TabView.AllGames)}
            to={`${url}/all-games`}
          >
            All Games
          </Link>
        </li>

        <li>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === TabView.Standings
                ? "text-green-500 border-green-500"
                : ""
            }`}
            onClick={() => setTabView(TabView.Standings)}
            to={`${url}/standings`}
          >
            Standings
          </Link>
        </li>

        <li>
          <Link
            className={`cursor-pointer py-2 px-4 text-gray-500 border-b-8 ${
              tabView === TabView.Champions
                ? "text-green-500 border-green-500"
                : ""
            }`}
            onClick={() => setTabView(TabView.Champions)}
            to={`${url}/champions`}
          >
            Champions
          </Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Tournament page</h3>
        </Route>
        <Route path={`${path}/matches`}>
          <TournamentMatches tournamentName={name} />
        </Route>
        <Route path={`${path}/all-games`}>
          <TournamentGames tournamentName={name} />
        </Route>
        <Route path={`${path}/standings`}>
          <Standings tournamentName={name} />
        </Route>
        <Route path={`${path}/champions`}>
          <Champions tournamentName={name} />
        </Route>
      </Switch>
    </PageLayout>
  );
};
