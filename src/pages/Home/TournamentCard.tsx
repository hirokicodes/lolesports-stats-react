import React from "react";

interface Props {
  tournamentData: ITournamentData;
}

interface ITournamentData {
  OverviewPage: string;
  Name: string;
  IsQualifier: number;
  League: string;
  Split: string;
  SplitNumber: number;
  TournamentLevel: string;
  IsOfficial: number;
  Year: number;
  Tags?: string[] | null;
  SuppressTopSchedule: number;
  Region: string;
  Date: string;
  DateStart: string;
  Date__precision: number;
  DateStart__precision: string;
}

export const TournamentCard: React.FC<Props> = ({ tournamentData }) => {
  const {
    Date: TournamentDate,
    Split,
    Region,
    League,
    Name: Tournamentname,
    OverviewPage,
  } = tournamentData;
  return (
    <div className="m-1 p-1 flex flex-col bg-blue-100 ">
      <div className="flex flex-row justify-between">
        <div className="text-xl">{Tournamentname}</div>
        <div>{Region}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div>{League}</div>
        <div>{TournamentDate}</div>
      </div>
    </div>
  );
};
