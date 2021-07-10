import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

interface Props {
  path: string; // Image path from assets eg. scoreboard-icons/kills.png
  width?: string;
  height?: string;
}

export const Icon: React.FC<Props> = ({
  path,
  width = "w-6",
  height = "h-6",
}) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/${path.replace("'", "%27")}`}
      className={`${width} ${height} rounded-lg inline-block bg-center m-0`}
    />
  );
};
