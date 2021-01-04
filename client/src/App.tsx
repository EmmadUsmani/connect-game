import React from "react";
import styled from "styled-components";

import { Play } from "./pages";
import { Game, GameColor } from "./models";
import { fonts, colors } from "./config";

const StyledDiv = styled.div`
  text-align: center;
  user-select: none;
  font-family: ${fonts.primary}, sans-serif;
  color: ${colors.text.primary};
`;

const App: React.FC = () => {
  Game.newGame([
    { name: "Alice", color: GameColor.Green },
    { name: "Bob", color: GameColor.Blue },
  ]);

  return (
    <StyledDiv>
      <Play />
    </StyledDiv>
  );
};

export default App;
