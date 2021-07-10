import { Switch, Route, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { MatchModal } from "../components/MatchModal";
import { Home } from "../pages/Home";
import { Match } from "../pages/Match";
import { Tournament } from "../pages/Tournament";

export const Routes: React.FC = () => {
  let location = useLocation();
  let background = location.state && (location.state as any).background;
  return (
    <div className="flex flex-col min-h-screen bg-bgMain">
      <Header />
      <div className="mt-16">
        <Switch location={background || location}>
          <Route exact path="/" component={Home} />
          <Route path="/tournaments/:name" component={Tournament} />
          <Route path="/matches/:matchId" component={Match} />
        </Switch>
        {background && (
          <Route path="/matches/:matchId" component={MatchModal} />
        )}
      </div>
    </div>
  );
};
