import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Home } from "modules/home/pages";
import { Create, Join } from "modules/createOrJoin/pages";
import { Room } from "modules/room/pages";
import { Play } from "modules/play/pages";
import { Menu } from "modules/menu/pages";

export function App() {
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
}
