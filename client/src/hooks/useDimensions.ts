import { useState, useEffect } from "react";

// TODO: remove this export?
export interface Dimensions {
  width: number;
  height: number;
}

const getDimensions = (): Dimensions => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export default function useDimensions(): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>(getDimensions());

  const resize = () => setDimensions(getDimensions());

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });

  return dimensions;
}
