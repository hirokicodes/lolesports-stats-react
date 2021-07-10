import React, { useMemo } from "react";

import { useQuery } from "react-query";
import { PageLayout } from "../../../layouts/PageLayout";
import { AppAPI } from "../../../api";
import { QueryResult } from "../../../api/types";

import { Table } from "../../../components/Table";

interface Props {
  tournamentName: string;
}

export interface StandingData {
  Name: string;
  TournamentLevel: string;
  OverviewPage: string;
  Place: number;
  Team: string;
  WinGames: number;
  LossGames: number;
  StreakDirection: string;
  Streak: number;
}

export const Standings: React.FC<Props> = ({ tournamentName }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Team",
        accessor: "Team",
      },
      {
        Header: "Win Rate",
        accessor: "WinRate",
      },
      {
        Header: "Wins",
        accessor: "WinGames",
      },
      {
        Header: "Losses",
        accessor: "LossGames",
      },
    ];
  }, []);

  async function getStandingsData() {
    const data = await AppAPI.getRoute(
      `/tournaments/${encodeURIComponent(tournamentName)}/standings`
    );
    return data;
  }

  const { isLoading, isError, data, error }: QueryResult<StandingData[]> =
    useQuery(`standings/${tournamentName}`, getStandingsData);

  const tableData = useMemo(() => {
    const standingsData: any[] = [];
    data?.forEach((standingData) => {
      const newStandingData = {
        Team: standingData.Team,
        WinGames: standingData.WinGames,
        LossGames: standingData.LossGames,
        WinRate:
          standingData.WinGames === 0
            ? 0
            : (
                (standingData.WinGames /
                  (standingData.WinGames + standingData.LossGames)) *
                100
              ).toFixed(2),
      };
      standingsData.push(newStandingData);
    });
    return standingsData;
  }, [data]);

  let content = null;
  if (isLoading) {
    content = <div>loading...</div>;
  }
  if (isError) {
    content = <div>error</div>;
  }
  if (data) {
    content = (
      <div>
        <div>standings</div>
        <div>
          <Table columns={columns} data={tableData!} />
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
