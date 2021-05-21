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
      piece: 70,
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
    const margin = 200;

    // board width = piece size * (2 * numcols - 1) + margin
    const pieceSizeW = (width - margin) / (2 * columns - 1);
    const pieceSizeH = (height - margin) / (2 * rows - 1);

    theme.sizes.game.piece = Math.floor(Math.min(pieceSizeH, pieceSizeW, 65));
  }, [width, height, columns, rows, theme.sizes.game]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
