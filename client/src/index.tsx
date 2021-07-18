import React from "react"
import ReactDOM from "react-dom"
import { MemoryRouter } from "react-router-dom"
import { createGlobalStyle } from "styled-components"

import { App } from "./App"
import { AppThemeProvider, GameProvider, OptionsProvider } from "./context"

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
  }
  body {
    text-align: center;
    user-select: none;
    font-family: ${(props) => props.theme.fonts.primary}, sans-serif;
    color: ${(props) => props.theme.colors.text.primary};
  }
`

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <OptionsProvider>
        <GameProvider>
          <AppThemeProvider>
            <GlobalStyle />
            <App />
          </AppThemeProvider>
        </GameProvider>
      </OptionsProvider>
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById("root")
)
