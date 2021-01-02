import React from "react";

import { GameColor } from "../../models";
import "./Circle.css";

interface CircleProps {
  size: number;
  color?: GameColor;
}

const Circle: React.FC<CircleProps> = ({ size, color }) => {
  const style = {
    width: size,
    height: size,
    margin: size / 2,
    backgroundColor: color,
    borderColor: color ? "transparent" : "var(--grey)",
  };

  return <div className="circle" style={style} />;
};

export default Circle;
