import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { Home, Name } from "./pages";
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
      <Router>
        <Switch>
          <Route path="/create/name">
            <Name />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
