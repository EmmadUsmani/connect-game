import React from "react";

const Button: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#626262",
        margin: "0 auto 20px",
        color: "white",
        fontSize: 36,
        maxWidth: 400,
        height: 75,
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};

export default Button;
