import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
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
    page: {
      marginHorizontal: 200,
      marginVertical: 250,
    },
    game: {
      piece: 70,
    },
    button: {
      width: 400,
      height: 75,
    },
  },
  fonts: {
    primary: "Quicksand",
  },
};

export const smallTheme: DefaultTheme = {
  ...defaultTheme,
  sizes: {
    ...defaultTheme.sizes,
    text: {
      extraLarge: 64,
      large: 42,
      medium: 36,
      small: 30,
      extraSmall: 24,
    },
    page: {
      marginHorizontal: 100,
      marginVertical: 250,
    },
    button: {
      width: 300,
      height: 50,
    },
  },
};
