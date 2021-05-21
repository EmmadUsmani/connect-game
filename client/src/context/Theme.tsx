import React, { useContext } from "react";
import { DefaultTheme, ThemeContext, ThemeProvider } from "styled-components";

/* Uses styled-components theme context:
https://styled-components.com/docs/advanced#theming */

const defaultTheme: DefaultTheme = {
  colors: {
    primary: "#626262", // dark grey
    secondary: "#F6F6F6", // light grey
    text: {
      primary: "#626262", // dark grey
      secondary: "#FFFFFF", // white
    },
    game: {
      piece: "#B6B6B6", // medium grey
    },
  },
  sizes: {
    text: {
      extraLarge: 72,
      large: 64,
      medium: 48,
      small: 36,
      extraSmall: 30,
    },
    game: {
      pieces: {
        large: 70,
        medium: 50,
        small: 30,
      },
    },
    button: 400,
  },
  fonts: {
    primary: "Quicksand",
  },
};

export const useTheme = () => useContext(ThemeContext);

export const AppThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
