import React, { useContext, useEffect } from "react";
import { DefaultTheme, ThemeContext, ThemeProvider } from "styled-components";
import { useDimensions } from "../hooks";
import { useGame } from ".";

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
      piece: {
        sizes: [70, 60, 45, 30, 20],
        size: 70,
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
  const { width, height } = useDimensions();
  const {
    gameState: {
      room: {
        settings: {
          boardSize: [columns, rows],
        },
      },
    },
  } = useGame();

  const theme = defaultTheme;

  useEffect(() => {
    const epsilon = 100;
    const sizes = theme.sizes.game.piece.sizes;

    // if window width < board width + epsilon, choose a smaller piece size
    let i = 0;
    while (
      width < sizes[i] * (2 * columns - 1) + epsilon &&
      i < sizes.length - 1
    )
      i++;

    while (height < sizes[i] * (2 * rows - 1) + epsilon && i < sizes.length - 1)
      i++;

    theme.sizes.game.piece.size = sizes[i];
  }, [width, height, columns, rows]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
