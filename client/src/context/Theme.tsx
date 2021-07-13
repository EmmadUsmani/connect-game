import React, { useContext, useState, useEffect } from "react";
import { DefaultTheme, ThemeContext, ThemeProvider } from "styled-components";

import { useDimensions } from "../hooks";
import { useGame } from ".";
import { defaultTheme, smallTheme } from "../config";

/* Uses styled-components theme context:
https://styled-components.com/docs/advanced#theming */

interface AppThemeProviderProps {
  children: React.ReactNode;
}

export const useTheme = () => useContext(ThemeContext);

export function AppThemeProvider({ children }: AppThemeProviderProps) {
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

  const [theme, setTheme] = useState<DefaultTheme>(defaultTheme);
  const {
    sizes: {
      page: { marginHorizontal, marginVertical },
    },
  } = theme;

  // Set theme based on screen size
  useEffect(() => {
    if (width <= 550) {
      setTheme(smallTheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [width]);

  // Scale piece size
  useEffect(() => {
    // board width = piece size * (2 * numcols - 1) + margin
    const pieceSizeW = (width - marginHorizontal) / (2 * columns - 1);
    const pieceSizeH = (height - marginVertical) / (2 * rows - 1);
    const pieceSize = Math.floor(Math.min(pieceSizeH, pieceSizeW, 65));

    setTheme((theme) => ({
      ...theme,
      sizes: { ...theme.sizes, game: { piece: pieceSize } },
    }));
  }, [width, height, columns, rows, marginHorizontal, marginVertical]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
