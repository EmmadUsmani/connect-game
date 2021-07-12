import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Home, Create, Join, Room, Menu } from "./pages";
import { Play } from "modules/play/pages";

const App: React.FC = () => {
  // Manually remove path since MemoryRouter doesn't update URL
  useEffect(() => {
    window.history.replaceState(null, "", "/");
  }, []);

  return (
    <>
      <Switch>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/room">
          <Room />
        </Route>
        <Route path="/play">
          <Play />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Menu />
    </>
  );
};

export default App;
