import { BrowserRouter } from "react-router-dom";
import { Routes } from "./Routes";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};
