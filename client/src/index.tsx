import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import App from "./App";
import { GameProvider } from "./context/game";
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

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <GameProvider>
        <App />
      </GameProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
