import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Header } from "../../components/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { AppAPI } from "../../api";

export const Home: React.FC<RouteComponentProps> = ({ match }) => {
  const [tournamentsData, setTournamentsData] = useState([]);
  const getData = async () => {
    // const data = await AppAPI.get({
    //   tables: "Tournaments=T",
    //   fields: "T.OverviewPage, T.Name, T.TournamentLevel",
    //   where: `T.Date > "2021-01-01" AND T.TournamentLevel="Primary"`,
    //   limit: 100,
    // });
    const data = await AppAPI.getRoute(`/tournaments`);
    console.log("data: ", data);
    setTournamentsData(data);
  };

  useEffect(() => {
    console.log("use eff");
    getData();
  }, []);

  return (
    <PageLayout>
      <div className="w-full max-w-3xl self-center text-textMain">
        <p className="pt-3 text-center">Recent Tournaments</p>
        <ul>
          {tournamentsData.map((tournament: any, i) => {
            console.log(tournament.OverviewPage);
            return (
              <li key={i}>
                <Link
                  to={`/tournament/${encodeURIComponent(
                    tournament.OverviewPage
                  )}`}
                >
                  {tournament.Name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </PageLayout>
  );
};
