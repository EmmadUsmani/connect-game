import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import { Home, Name, Settings, Room, Play } from "./pages";
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
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/create/name">
            <Name />
          </Route>
          <Route path="/create/settings">
            <Settings />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
          <Route path="/play">
            <Play />
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
