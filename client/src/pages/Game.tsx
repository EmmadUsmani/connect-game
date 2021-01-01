import React from "react";

import { Board } from "../components/game";
import "./Game.css";

const Game: React.FC = () => {
  return (
    <>
      <p className="turn">Your turn</p>
      <Board numRows={6} numCols={7} />
    </>
  );
};

export default Game;
