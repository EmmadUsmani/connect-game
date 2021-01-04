import React from "react";

import { Menu } from "./pages";
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
      <Menu />
    </div>
  );
};

export default App;
