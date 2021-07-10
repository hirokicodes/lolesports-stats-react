import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

interface Props {
  path: string; // Image path from assets eg. scoreboard-icons/kills.png
  backgroundSize?: number; // Background size in pixels
  width?: number;
  height?: number;
}

export const Icon: React.FC<Props> = ({
  path,
  backgroundSize = 18,
  width = 4,
  height = 4,
}) => {
  return (
    <span
      style={{
        backgroundImage: `url('/assets/${path.replace("'", "%27")}')`,
        backgroundSize: `${backgroundSize}px`,
      }}
      className={`w-${width} h-${height} mx-1 rounded-lg text-black inline-block bg-center`}
    />
  );
};
