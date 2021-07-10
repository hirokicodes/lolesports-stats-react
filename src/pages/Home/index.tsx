import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Header } from "../../components/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { AppAPI } from "../../api";
import { TournamentCard } from "./TournamentCard";
import { useQuery } from "react-query";

export const Home: React.FC<RouteComponentProps> = ({ match }) => {
  async function getTournamentData() {
    const data = await AppAPI.getRoute(`/tournaments`);
    return data;
  }
  const { isLoading, isError, data, error } = useQuery(
    "tournaments",
    getTournamentData
  );
  console.log("isLoading: ", isLoading);
  console.log("data: ", data);
  console.log("isError:", isError);
  console.log("error: ", error);

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
        {data.map((tournament: any, i: number) => {
          console.log(tournament.OverviewPage);
          return (
            <div key={i}>
              <Link
                to={`/tournaments/${encodeURIComponent(
                  tournament.OverviewPage
                )}`}
              >
                <TournamentCard tournamentData={tournament} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="w-full max-w-3xl self-center text-textMain">
        <p className="pt-3 text-center">Recent Tournaments</p>
        {content}
      </div>
    </PageLayout>
  );
};
