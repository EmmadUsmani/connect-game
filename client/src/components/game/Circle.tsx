import React from "react";

import "./Circle.css";

interface CircleProps {
  size: number;
}

const Circle: React.FC<CircleProps> = ({ size }) => {
  const style = {
    width: size,
    height: size,
    margin: size / 2,
  };

  return <div className="circle" style={style} />;
};

export default Circle;
