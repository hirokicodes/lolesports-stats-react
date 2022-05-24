import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Header } from "../../components/Header";
import { PageLayout } from "../../layouts/PageLayout";
import { AppAPI } from "../../api";
import { TournamentCard } from "./TournamentCard";
import { useQuery } from "react-query";
import { Dropdown } from "../../components/Dropdown";

const SearchRegions = [
  {
    name: "All",
    value: "",
  },
  {
    name: "International",
    value: "International",
  },
  {
    name: "Korea",
    value: "Korea",
  },
  {
    name: "China",
    value: "China",
  },
  {
    name: "Europe",
    value: "Europe",
  },
  {
    name: "North America",
    value: "North America",
  },
  {
    name: "PCS",
    value: "PCS",
  },
  {
    name: "Vietnam",
    value: "Vietnam",
  },
  {
    name: "Brazil",
    value: "Brazil",
  },
  {
    name: "Turkey",
    value: "Turkey",
  },
  {
    name: "Japan",
    value: "Japan",
  },
  {
    name: "Latin America",
    value: "Latin America",
  },
  {
    name: "CIS",
    value: "CIS",
  },
  {
    name: "Oceania",
    value: "Oceania",
  },
  {
    name: "MENA",
    value: "MENA",
  },
];

const SearchSeasons = [
  {
    name: "S1",
    value: "2011",
  },
  {
    name: "S2",
    value: "2012",
  },
  {
    name: "S3",
    value: "2013",
  },
  {
    name: "S4",
    value: "2014",
  },
  {
    name: "S5",
    value: "2015",
  },
  {
    name: "S6",
    value: "2016",
  },
  {
    name: "S7",
    value: "2017",
  },
  {
    name: "S8",
    value: "2018",
  },
  {
    name: "S9",
    value: "2019",
  },
  {
    name: "S10",
    value: "2020",
  },
  {
    name: "S11",
    value: "2021",
  },
  {
    name: "S12",
    value: "2022",
  },
];

interface DropdownOption {
  name: string;
  value: string;
}

export const Home: React.FC<RouteComponentProps> = ({ match }) => {
  // Tournament search params
  // Season
  const [searchSeason, setSearchSeason] = useState(
    SearchSeasons[SearchSeasons.length - 1]
  );
  // Region
  const [searchRegion, setSearchRegion] = useState(SearchRegions[0]);

  function seasonDropdownHandler(season: DropdownOption) {
    setSearchSeason(season);
  }

  function regionDropdownHandler(region: DropdownOption) {
    setSearchRegion(region);
  }

  async function getTournamentData() {
    const data = await AppAPI.getRoute(`/tournaments`, {
      regions: searchRegion.name === "All" ? undefined : [searchRegion.value],
      year: searchSeason.value,
    });
    return data;
  }
  const { isLoading, isError, data, error } = useQuery(
    `tournaments-${searchRegion.value}-${searchSeason.value}`,
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
        <div className="flex w-full ">
          <div className="w-1/3">
            <Dropdown
              label={"Region"}
              currentOption={searchRegion}
              dropdownOptions={SearchRegions}
              handler={regionDropdownHandler}
            />
          </div>
          <div className="w-1/3">
            <Dropdown
              label={"Season"}
              currentOption={searchSeason}
              dropdownOptions={SearchSeasons.slice().reverse()}
              handler={seasonDropdownHandler}
            />
          </div>
        </div>

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
