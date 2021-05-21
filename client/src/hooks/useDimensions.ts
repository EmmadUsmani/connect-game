import { useState, useEffect } from "react";

interface Dimensions {
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

/* Hook inspired by QoP's StackOverflow answer:
https://stackoverflow.com/a/36862446
*/
