import React from "react";

interface Props {}

export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col p-2 w-full items-center">
      <div className="flex flex-col w-full max-w-5xl">{children}</div>
    </div>
  );
};
