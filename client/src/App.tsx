import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import { Home, Create, Room, Play } from "./pages";
import { ProtectedRoute } from "./components";
import { GameSettings, Game, GameColor } from "./models";

const App: React.FC = () => {
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleLoad = (): void => {
    setIsLoaded(true);
  };

  const handleCreate = (name: string, settings: GameSettings): void => {
    const {
      boardSize: [numCols, numRows],
      winCondition,
    } = settings;
    Game.newGame(
      [
        { name: name, color: GameColor.Blue },
        { name: "Bob", color: GameColor.Green },
      ],
      numCols,
      numRows,
      winCondition
    );
    history.push("/room");
  };

  return (
    <Switch>
      <ProtectedRoute accessible={isLoaded} path="/create">
        <Create onCreate={handleCreate} />
      </ProtectedRoute>
      <ProtectedRoute accessible={isLoaded} path="/room">
        <Room />
      </ProtectedRoute>
      <ProtectedRoute accessible={isLoaded} path="/play">
        <Play />
      </ProtectedRoute>
      <Route exact path="/">
        <Home onLoad={handleLoad} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default App;
