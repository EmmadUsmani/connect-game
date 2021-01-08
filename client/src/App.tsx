import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { Home, Create, Room, Play } from "./pages";
import { GameSettings, Game, GameColor } from "./models";

const App: React.FC = () => {
  const history = useHistory();

  const handleCreate = (name: string, settings: GameSettings): void => {
    const {
      boardSize: [numCols, numRows],
      winCondition,
    } = settings;
    Game.newGame(
      [{ name: name, color: GameColor.Blue }],
      numCols,
      numRows,
      winCondition
    );
    history.push("/room");
  };

  return (
    <Switch>
      <Route path="/create">
        <Create onCreate={handleCreate} />
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
  );
};

export default App;
