import React from "react";
import styled from "styled-components";

import { Text } from "../";
import { GamePlayer, GameWinner } from "../../models";
import { fonts } from "../../config";

interface HeaderProps {
  currPlayer: GamePlayer;
  winner?: GameWinner;
}

const StyledText = styled(Text)`
  margin-bottom: 90px;
`;

const StyledSpan = styled.span`
  color: ${(props) => props.color};
`;

const Header: React.FC<HeaderProps> = ({ currPlayer, winner }) => {
  let message: React.ReactNode;
  switch (winner) {
    // no player has won yet
    case undefined:
      message = (
        <>
          <StyledSpan color={currPlayer.color}>{currPlayer.name}</StyledSpan>'s
          turn
        </>
      );
      break;
    // game is a tie
    case null:
      message = <>Draw</>;
      break;
    // there is a winner
    default:
      message = (
        <>
          <StyledSpan color={winner.color}>{winner.name}</StyledSpan> won!
        </>
      );
      break;
  }

  return <StyledText size={fonts.sizes.large}>{message}</StyledText>;
};

export default Header;
