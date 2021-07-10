import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

interface Props {
  path: string; // Image path from assets eg. scoreboard-icons/kills.png
  width?: number;
  height?: number;
}

export const Icon: React.FC<Props> = ({ path, width = 6, height = 6 }) => {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/${path.replace("'", "%27")}`}
      className={`w-${width} h-${height} rounded-lg inline-block bg-center m-0`}
    />
  );
};
