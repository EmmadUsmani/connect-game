import React from "react";

import { Board } from "../components/game";
import { Color, Game } from "../models";
import "./Play.css";

const Play: React.FC = () => {
  const game = new Game([
    { name: "Blue", color: Color.Blue },
    { name: "Green", color: Color.Green },
  ]);

  return (
    <>
      <p className="turn">Your turn</p>
      <Board game={game} />
    </>
  );
};

export default Play;
