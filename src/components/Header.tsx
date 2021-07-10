import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <nav className="fixed w-full flex items-center flex-wrap px-4 py-2 shadow z-20 bg-white">
      <Link
        to="/"
        className="font-semibold text-xl text-black mr-6 p-2 rounded-lg bg-themeMain hover:bg-themeHover"
      >
        Home
      </Link>

      <Link
        to="/tournaments"
        className="text-textLight hover:bg-bgHover rounded-lg p-2"
      >
        Tournaments
      </Link>
      <Link
        to="/teams"
        className="text-textLight hover:bg-bgHover rounded-lg p-2"
      >
        Teams
      </Link>

      <Link
        to="/players"
        className="text-textLight hover:bg-bgHover rounded-lg p-2"
      >
        Players
      </Link>
      <Link
        to="/champions"
        className="text-textLight hover:bg-bgHover rounded-lg p-2"
      >
        Champions
      </Link>
    </nav>
  );
};
