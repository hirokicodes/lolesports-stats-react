import React, { useMemo } from "react";

import { useQuery } from "react-query";
import { PageLayout } from "../../../layouts/PageLayout";
import { AppAPI } from "../../../api";
import { QueryResult } from "../../../api/types";

import { Table } from "../../../components/Table";

interface Props {
  tournamentName: string;
}

export interface ChampionData {
  Champion: string;
  Picks: number;
  Bans: number;
}

export const Champions: React.FC<Props> = ({ tournamentName }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Champion",
        accessor: "Champion",
      },
      {
        Header: "Picks",
        accessor: "Picks",
      },
      {
        Header: "Bans",
        accessor: "Bans",
      },
      {
        Header: "Presence",
        accessor: "Presence",
      },
      {
        Header: "Wins",
        accessor: "Wins",
      },
      {
        Header: "Losses",
        accessor: "Losses",
      },
      {
        Header: "Win Rate",
        accessor: "WinRate",
      },
    ];
  }, []);

  async function getChampionsData() {
    const data = await AppAPI.getRoute(
      `/tournaments/${encodeURIComponent(tournamentName)}/champions`
    );
    console.log(data);
    return data;
  }

  const { isLoading, isError, data, error }: QueryResult<ChampionData[]> =
    useQuery(`${tournamentName}-champions`, getChampionsData);

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
        <div>
          <Table columns={columns} data={data} />
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
