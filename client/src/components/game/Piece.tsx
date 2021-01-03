import React from "react";

import { GameColor } from "../../models";
import "./Piece.css";

interface PieceProps {
  size: number;
  color?: GameColor;
}

const Piece: React.FC<PieceProps> = ({ size, color }) => {
  const style = {
    width: size,
    height: size,
    margin: `${size / 2}px 0px`,
    backgroundColor: color,
    borderColor: color ? "transparent" : "var(--grey)",
  };

  return <div className="piece" style={style} />;
};

export default Piece;
