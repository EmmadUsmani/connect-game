import React from "react";

interface TextProps {
  size?: number;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ size, children }) => {
  return <p style={{ fontSize: size || 36 }}>{children}</p>;
};

export default Text;
