import React from "react";
import { createGlobalStyle } from "styled-components";

import { Menu } from "./pages";
import { Game, GameColor } from "./models";
import { fonts, colors } from "./config";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
  }
  body {
    text-align: center;
    user-select: none;
    font-family: ${fonts.primary}, sans-serif;
    color: ${colors.text.primary};
  }
`;

const App: React.FC = () => {
  Game.newGame([
    { name: "Alice", color: GameColor.Green },
    { name: "Bob", color: GameColor.Blue },
  ]);

  return (
    <>
      <GlobalStyle />
      <Menu />
    </>
  );
};

export default App;
