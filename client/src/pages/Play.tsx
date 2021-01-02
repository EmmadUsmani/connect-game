import React from "react";

import { Board } from "../components/game";
import { GameColor, Game } from "../models";
import "./Play.css";

const Play: React.FC = () => {
  Game.newGame([
    { name: "Alice", color: GameColor.Green },
    { name: "Bob", color: GameColor.Blue },
  ]);

  return (
    <>
      <p className="turn">Your turn</p>
      <Board />
    </>
  );
};

export default Play;
