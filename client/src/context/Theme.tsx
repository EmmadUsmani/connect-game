import React, { useContext, useState, useEffect } from "react"
import { ThemeContext, ThemeProvider } from "styled-components"

import { defaultTheme, smallTheme } from "../config"
import { useDimensions } from "../hooks"

import { useGame } from "."

/* Uses styled-components theme context:
https://styled-components.com/docs/advanced#theming */

interface AppThemeProviderProps {
  children: React.ReactNode
}

export const useTheme = () => useContext(ThemeContext)

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { width, height } = useDimensions()

  const {
    gameState: {
      room: {
        settings: {
          boardSize: [columns, rows],
        },
      },
    },
  } = useGame()

  const [theme, setTheme] = useState(defaultTheme)
  const {
    sizes: {
      page: { marginHorizontalRatio, marginVerticalRatio },
      game: { headerHeight },
    },
  } = theme

  // Set theme based on screen size
  useEffect(() => {
    if (width <= 550) {
      setTheme(smallTheme)
    } else {
      setTheme(defaultTheme)
    }
  }, [width])

  // Scale piece size
  useEffect(() => {
    // board width = piece size * (2 * numcols - 1) + margin
    const pieceSizeW = (width * (1 - marginHorizontalRatio)) / (2 * columns - 1)
    // header = text height + 1.5 * pieceSize; footer = 2 * pieceSize
    // footer = 2 * piece size
    // board height = (2 * numrows - 1) * pieceSize
    // play component height = header + footer + board height
    const pieceSizeH =
      (height * (1 - marginVerticalRatio) - headerHeight) / (2.5 + 2 * rows)
    const pieceSize = Math.floor(Math.min(pieceSizeH, pieceSizeW, 60))

    setTheme((theme) => ({
      ...theme,
      sizes: {
        ...theme.sizes,
        game: { ...theme.sizes.game, piece: pieceSize },
      },
    }))
  }, [
    width,
    height,
    columns,
    rows,
    marginHorizontalRatio,
    marginVerticalRatio,
    headerHeight,
  ])

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

// TODO: better documentation for height calculation
