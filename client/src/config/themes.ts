import { DefaultTheme } from "styled-components"

export const defaultTheme: DefaultTheme = {
  colors: {
    primary: "#626262", // dark grey
    secondary: "#F6F6F6", // light grey
    white: "#FFFFFF",
    negative: "#913030", // dark red
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
      medium: 36,
      small: 30,
      extraSmall: 20,
    },
    page: {
      marginHorizontalRatio: 0.25,
      marginVerticalRatio: 0.3,
    },
    game: {
      piece: 60,
      headerHeight: 80,
    },
    button: {
      width: 400,
      height: 75,
    },
  },
  fonts: {
    primary: "Quicksand",
  },
}

export const smallTheme: DefaultTheme = {
  ...defaultTheme,
  sizes: {
    ...defaultTheme.sizes,
    text: {
      extraLarge: 64,
      large: 42,
      medium: 36,
      small: 30,
      extraSmall: 14,
    },
    page: {
      marginHorizontalRatio: 0.1,
      marginVerticalRatio: 0.15,
    },
    game: {
      ...defaultTheme.sizes.game,
      headerHeight: 55,
    },
    button: {
      width: 300,
      height: 50,
    },
  },
}
