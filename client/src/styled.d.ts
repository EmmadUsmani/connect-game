import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: {
        primary: string;
        secondary: string;
      };
      game: {
        piece: string;
      };
    };
    sizes: {
      text: {
        extraLarge: number; // home logo
        large: number; // play header & instructions
        medium: number;
        small: number; // button & input text
        extraSmall: number; // label
      };
      game: {
        piece: {
          sizes: number[];
          size: number; // chosen value
        };
      };
      button: number; // width
    };
    fonts: {
      primary: string;
    };
  }
}
