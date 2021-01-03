import React from "react";

import { Play } from "./pages";
import { Game, GameColor } from "./models";
import "./App.css";

const App: React.FC = () => {
  Game.newGame([
    { name: "Alice", color: GameColor.Green },
    { name: "Bob", color: GameColor.Blue },
    // { name: "Carol", color: GameColor.Pink },
    // { name: "Dave", color: GameColor.Orange },
  ]);

  return (
    <div className="page">
      <Play />
    </div>
  );
};

export default App;
